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

// Automation Interfaces
import {ILogAutomation} from "./interfaces/ILogAutomation.sol";

// Utils
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

contract Router is Withdraw, CCIPReceiver, CCIPFeesTypes, ILogAutomation {
    using Strings for uint256;

    Portals nft;
    address immutable i_link;
    address immutable i_ccip_router;
    bytes32 public donId;
    uint64 public subscriptionId;
    uint32 public gasLimit;
    mapping(address => bool) public isMinter;

    error UnAuthorizedMinter();
    error NotPortalContract();
    error MintError(address to, string uri);

    event InitiateCrossChainTransfer(
        uint64 destinationChain,
        PayFeesIn payFeesIn,
        uint256 tokenId,
        address to,
        string uri,
        uint256 fee,
        bytes32 messageId
    );

    error CrossChainMintError(Client.Any2EVMMessage message);

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

    event MessageSent(bytes32 messageId);

    constructor(address ccipRouter, address link, address nftAddress, string memory _donId) CCIPReceiver(ccipRouter) {
        i_link = link;
        i_ccip_router = ccipRouter;
        nft = Portals(nftAddress);
        donId = bytes32(abi.encodePacked(_donId));
        gasLimit = 300000;
    }

    receive() external payable {}

    // Automation
    function checkLog(Log calldata log, bytes memory)
        external
        pure
        returns (bool upkeepNeeded, bytes memory performData)
    {
        uint256 chainId = uint256(log.topics[1]);
        uint256 tokenId = uint256(log.topics[2]);

        performData = abi.encode(chainId, tokenId);
        return (true, "");
    }

    function performUpkeep(bytes calldata performData) external override {
        (uint256 chainId, uint256 tokenId) = abi.decode(performData, (uint256, uint256));
        // TODO Perform Request for nft
        string memory source = "";
        bytes memory encryptedSecretsUrls = "0x";
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
    }

    // Cross Chain Transfer
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

    function getIdAndOwner(bytes calldata data) public pure returns (address, string memory) {
        (address to, string memory uri) = abi.decode(data[4:], (address, string));
        return (to, uri);
    }

    // Receive Cross chain Transfers
    function _ccipReceive(Client.Any2EVMMessage memory message) internal override {
        (bool success,) = address(nft).call(message.data);
        uint256 nextTokenId = nft.getNextTokenId();
        if (!success) {
            revert CrossChainMintError(message);
        }
    }

    // Same Chain Mint Function
    function mint(address to, string memory uri) public onlyMinter {
        (bool success,) = address(nft).call(abi.encodeWithSignature("safeMint(address,string)", to, uri));
        if (!success) {
            revert MintError(to, uri);
        }
    }

    // Admin Functions
    function setDonId(string memory _donId) external onlyOwner {
        donId = bytes32(abi.encodePacked(_donId));
    }

    function setSubscriptionId(uint64 _subscriptionId) external onlyOwner {
        subscriptionId = _subscriptionId;
    }

    function setGasLimit(uint32 _gasLimit) external onlyOwner {
        gasLimit = _gasLimit;
    }
}
