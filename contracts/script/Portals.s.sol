// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import "../src/Portals.sol";
import "../src/Minter.sol";

contract PortalsScriptMumbai is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployerPublicKey = vm.addr(deployerPrivateKey);
        vm.startBroadcast(deployerPrivateKey);

        // Deploy Portals NFT Contract
        Portals portals = new Portals(deployerPublicKey);
        address portalsAddress = address(portals);
        console.log("Portals Deployed to %s", portalsAddress);

        // Deploy Minter Contract
        string memory mumbaiRouter = "0x70499c328e1e2a3c41108bd3730f6670a44595d1";
        string memory mumbaiLink = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
        Minter minter = new Minter(vm.parseAddress(mumbaiRouter), vm.parseAddress(mumbaiLink), portalsAddress);
        address minterAddress = address(minter);
        console.log("Minter Deployed to %s", minterAddress);

        // Set Minter Address
        portals.setMinter(minterAddress);

        // Set New Owner
        portals.transferOwnership(minterAddress);

        vm.stopBroadcast();
    }
}
