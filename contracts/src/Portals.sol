// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// ERC-721 Imports
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

// CCIP Contract
import {Router} from "./Router.sol";
import {CCIPFeesTypes} from "./interfaces/CCIPFeesTypes.sol";

// Functions Imports
import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/FunctionsClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/dev/v1_0_0/libraries/FunctionsRequest.sol";

contract Portals is ERC721, ERC721URIStorage, ERC721Burnable, CCIPFeesTypes, FunctionsClient, ConfirmedOwner {
    using FunctionsRequest for FunctionsRequest.Request;

    // State Variables
    bytes32 public s_lastRequestId;
    bytes public s_lastResponse;
    bytes public s_lastError;

    Router public router;
    uint256 public _nextTokenId;

    // Errors
    error NotRouter();
    error NotOwnerOfToken(uint256 tokenId, address user);
    error NotAllowed();
    error UnexpectedRequestID(bytes32 requestId);

    // Events
    event Response(bytes32 indexed requestId, bytes response, bytes err);
    event CrossChainTransferRequested(
        uint256 tokenId, uint64 destinationChainSelector, address receiver, PayFeesIn payFeesIn, address to
    );
    event CrossChainMintSuccess(uint256 chainId, uint256 tokenId, string uri);

    constructor(address initialOwner, address functionsRouter)
        ERC721("Portals", "PORTAL")
        FunctionsClient(functionsRouter)
        ConfirmedOwner(initialOwner)
    {}

    function setRouter(address _router) public onlyOwner {
        router = Router(payable(address(_router)));
    }

    modifier onlyRouter() {
        if (msg.sender != address(router)) {
            revert NotRouter();
        }
        _;
    }

    /// @dev Mint a new token by calling Router
    /// @param to The address to mint to
    /// @param uri The URI of the token
    function safeMint(address to, string memory uri) public onlyRouter {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    /// @notice Called by Router when a Cross chain Transfer takes place
    /// @dev Cross Chain Mint
    /// @param to The address to mint to
    /// @param uri The URI of the token
    function crossChainMint(address to, string memory uri) public onlyRouter {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        emit CrossChainMintSuccess(block.chainid, tokenId, uri);
    }

    /// @notice Called by Token Holder to request a cross chain transfer
    /// @dev Cross Chain Transfer
    /// @param tokenId The token to transfer
    /// @param destinationChainSelector The chain to transfer to
    /// @param receiver The address to receive the token, Router address on destination chain
    /// @param payFeesIn The currency to pay fees in (0: Native, 1: LINK)
    /// @param to The address to mint to
    function requestCrossChainTransfer(
        uint256 tokenId,
        uint64 destinationChainSelector,
        address receiver,
        PayFeesIn payFeesIn,
        address to
    ) public {
        if (ownerOf(tokenId) != msg.sender) {
            revert NotOwnerOfToken(tokenId, msg.sender);
        }
        string memory uri = tokenURI(tokenId);
        safeTransferFrom(msg.sender, owner(), tokenId);
        _setTokenURI(tokenId, "");
        router.crossChainTransfer(destinationChainSelector, receiver, payFeesIn, tokenId, to, uri);
        emit CrossChainTransferRequested(tokenId, destinationChainSelector, receiver, payFeesIn, to);
    }

    // The following functions are overrides required by Solidity.
    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    // Chainlink Functions

    /// @notice Sends a Chainlink Function Request to update URI With Access Control Conditions
    /// @dev Call to Chainlink Functions, invoked by Router
    /// @param source The Function Source Code
    /// @param encryptedSecretsUrls The Encrypted Secrets Urls
    /// @param donHostedSecretsSlotID The DON Hosted Secrets Slot ID
    /// @param donHostedSecretsVersion The DON Hosted Secrets Version
    /// @param args The Function Arguments
    /// @param bytesArgs The Function Bytes Arguments
    /// @param subscriptionId The Functions Subscription ID
    /// @param gasLimit The Gas Limit
    /// @param donID The DON ID
    /// @return requestId The Request ID
    function sendRequest(
        string memory source,
        bytes memory encryptedSecretsUrls,
        uint8 donHostedSecretsSlotID,
        uint64 donHostedSecretsVersion,
        string[] memory args,
        bytes[] memory bytesArgs,
        uint64 subscriptionId,
        uint32 gasLimit,
        bytes32 donID
    ) external onlyRouter returns (bytes32 requestId) {
        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript(source);
        if (encryptedSecretsUrls.length > 0) {
            req.addSecretsReference(encryptedSecretsUrls);
        } else if (donHostedSecretsVersion > 0) {
            req.addDONHostedSecrets(donHostedSecretsSlotID, donHostedSecretsVersion);
        }
        if (args.length > 0) req.setArgs(args);
        if (bytesArgs.length > 0) req.setBytesArgs(bytesArgs);
        s_lastRequestId = _sendRequest(req.encodeCBOR(), subscriptionId, gasLimit, donID);
        return s_lastRequestId;
    }

    /// @notice This function sends request to Chainlink Function to update URI With Access Control Conditions
    /// @dev Call to Chainlink Functions, invoked by Router
    /// @param request The Function Request
    /// @param subscriptionId The Functions Subscription ID
    /// @param gasLimit The Gas Limit
    /// @param donID The DON ID
    /// @return requestId The Request ID
    function sendRequestCBOR(bytes memory request, uint64 subscriptionId, uint32 gasLimit, bytes32 donID)
        external
        returns (bytes32 requestId)
    {
        s_lastRequestId = _sendRequest(request, subscriptionId, gasLimit, donID);
        return s_lastRequestId;
    }

    /// @notice The functions updates the uri from the response which  contains tokenId and the new URI
    /// @dev Return FullFill request to Chainlink Functions
    /// @param requestId The Request ID
    /// @param response The Function Response
    /// @param err The Function Error
    function fulfillRequest(bytes32 requestId, bytes memory response, bytes memory err) internal override {
        if (s_lastRequestId != requestId) {
            revert UnexpectedRequestID(requestId);
        }
        s_lastResponse = response;
        (, uint256 tokenId, string memory newURI) = abi.decode(response, (uint256, uint256, string));
        _setTokenURI(tokenId, newURI);
        s_lastError = err;
        emit Response(requestId, s_lastResponse, s_lastError);
    }
}
