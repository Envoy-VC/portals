// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

// CCIP Imports
import {Withdraw} from "./utils/Withdraw.sol";
import {LinkTokenInterface} from "./interfaces/LinkTokenInterface.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";
import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {CCIPFeesTypes} from "./interfaces/CCIPFeesTypes.sol";

// NFT Contract
import {Portals} from "./Portals.sol";

// Utils
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

// Automation Interface
import "@chainlink/contracts/src/v0.8/automation/interfaces/ILogAutomation.sol";

contract Router is Withdraw, CCIPReceiver, CCIPFeesTypes, ILogAutomation {
    using Strings for uint256;

    // State Variables
    Portals public nft;
    address immutable i_link;
    address immutable i_ccip_router;
    mapping(address => bool) public isMinter;

    // Functions Variables
    bytes32 public donId;
    uint64 public subscriptionId;
    uint32 public gasLimit;
    string public source =
        "const chainId = args[0];const tokenId = args[1];const url = 'https://portals-teal.vercel.app/api/update-acc';const req =Functions.makeHttpRequest({url: url,method: 'POST',headers: { 'Content-Type': 'application/json' },data: { chainId: chainId, tokenId: tokenId },});const response = await req;let hexString = response['data'];hexString = hexString.substring(2);const arrayBuffer = new Uint8Array(hexString.length / 2 - 1);for (var i = 4; i < hexString.length; i += 2) {var byteValue = parseInt(hexString.substr(i, 2), 16);arrayBuffer[i / 2] = byteValue;}return arrayBuffer;";

    // Errors
    error UnAuthorizedMinter();
    error NotPortalContract();
    error MintError(address to, string uri);
    error CrossChainMintError(Client.Any2EVMMessage message);

    // Events

    event MessageSent(bytes32 messageId);
    event InitiateCrossChainTransfer(
        uint64 destinationChain,
        PayFeesIn payFeesIn,
        uint256 tokenId,
        address to,
        string uri,
        uint256 fee,
        bytes32 messageId
    );
    event RequestURIUpdate(
        string source,
        bytes encryptedSecretsUrls,
        uint8 donHostedSecretsSlotID,
        uint64 donHostedSecretsVersion,
        string[] args,
        bytes[] bytesArgs,
        uint64 subscriptionId,
        uint32 gasLimit,
        bytes32 donId
    );

    // Modifiers
    modifier onlyMinter() {
        if (!isMinter[msg.sender]) {
            revert UnAuthorizedMinter();
        }
        _;
    }

    modifier onlyPortalsContract() {
        if (msg.sender != address(nft)) {
            revert NotPortalContract();
        }
        _;
    }

    constructor(address ccipRouter, address link, address nftAddress, string memory _donId) CCIPReceiver(ccipRouter) {
        i_link = link;
        i_ccip_router = ccipRouter;
        nft = Portals(payable(address(nftAddress)));
        donId = bytes32(abi.encodePacked(_donId));
        gasLimit = 300000;
    }

    receive() external payable {}

    /// @notice Check if Automation is Needed after Log is Emitted by Portals Contract
    /// @param log The log emitted by Portals Contract
    /// @return upkeepNeeded Whether upkeep is needed or not
    /// @return performData The data to be passed to performUpkeep

    function checkLog(Log calldata log, bytes memory)
        external
        pure
        returns (bool upkeepNeeded, bytes memory performData)
    {
        (uint256 chainId, uint256 tokenId) = abi.decode(log.data, (uint256, uint256));

        performData = abi.encode(chainId, tokenId);
        return (true, performData);
    }

    /// @notice Call the Functions to perform URI Update after CrossChainMint Event is Emitted
    /// @param performData The data passed from checkLog

    function performUpkeep(bytes calldata performData) external override {
        (uint256 chainId, uint256 tokenId) = abi.decode(performData, (uint256, uint256));
        bytes memory encryptedSecretsUrls = "";
        uint8 donHostedSecretsSlotID = 0;
        uint64 donHostedSecretsVersion = 0;
        string[] memory args = new string[](2);
        args[0] = chainId.toString();
        args[1] = tokenId.toString();
        bytes[] memory bytesArgs = new bytes[](0);

        nft.sendRequest(
            source,
            encryptedSecretsUrls,
            donHostedSecretsSlotID,
            donHostedSecretsVersion,
            args,
            bytesArgs,
            subscriptionId,
            gasLimit,
            donId
        );

        emit RequestURIUpdate(
            source,
            encryptedSecretsUrls,
            donHostedSecretsSlotID,
            donHostedSecretsVersion,
            args,
            bytesArgs,
            subscriptionId,
            gasLimit,
            donId
        );
    }

    /// @notice Cross Chain Transfer NFT
    /// @param destinationChainSelector The Chain ID of the Destination Chain
    /// @param receiver The Receiver Address (Router Address on Destination Chain)
    /// @param payFeesIn The Token to Pay Fees in (0: Native, 1: LINK)
    /// @param tokenId The Token ID to Transfer
    /// @param to The Address to Mint to
    /// @param uri The URI of the Token
    function crossChainTransfer(
        uint64 destinationChainSelector,
        address receiver,
        PayFeesIn payFeesIn,
        uint256 tokenId,
        address to,
        string memory uri
    ) external onlyPortalsContract {
        Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
            receiver: abi.encode(receiver),
            data: abi.encodeWithSignature("crossChainMint(address,string)", to, uri),
            tokenAmounts: new Client.EVMTokenAmount[](0),
            extraArgs: "",
            feeToken: payFeesIn == PayFeesIn.LINK ? i_link : address(0)
        });

        uint256 fee = IRouterClient(i_ccip_router).getFee(destinationChainSelector, message);

        bytes32 messageId;

        if (payFeesIn == PayFeesIn.LINK) {
            LinkTokenInterface(i_link).approve(i_router, fee);
            messageId = IRouterClient(i_ccip_router).ccipSend(destinationChainSelector, message);
        } else {
            messageId = IRouterClient(i_ccip_router).ccipSend{value: fee}(destinationChainSelector, message);
        }
        emit InitiateCrossChainTransfer(destinationChainSelector, payFeesIn, tokenId, to, uri, fee, messageId);
        emit MessageSent(messageId);
    }

    /// @notice Receive Cross Chain Transfers, Call crossChainMint Function on Portals Contract
    /// @param message The Message Received from CCIP Router

    function _ccipReceive(Client.Any2EVMMessage memory message) internal override {
        (bool success,) = address(nft).call(message.data);
        require(success, "Cross Chain Mint Failed");
    }

    /// @notice Called by Users to Mint NFT
    /// @param to The Address to Mint to
    /// @param uri The URI of the Token
    /// @return success Whether the Mint was Successful or not
    /// @return data The Data returned by the Mint Function
    function mint(address to, string memory uri) public onlyMinter returns (bool, bytes memory) {
        (bool success, bytes memory data) =
            address(nft).call(abi.encodeWithSignature("safeMint(address,string)", to, uri));

        require(success);
        return (success, data);
    }

    // Owner Functions
    function setMinter(address minter, bool isMinter_) external onlyOwner {
        isMinter[minter] = isMinter_;
    }

    function setDonId(string memory _donId) external onlyOwner {
        donId = bytes32(abi.encodePacked(_donId));
    }

    function setSubscriptionId(uint64 _subscriptionId) external onlyOwner {
        subscriptionId = _subscriptionId;
    }

    function setGasLimit(uint32 _gasLimit) external onlyOwner {
        gasLimit = _gasLimit;
    }

    function changeSource(string memory _source) public onlyOwner {
        source = _source;
    }
}
