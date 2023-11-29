// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import "../src/Portals.sol";
import "../src/Router.sol";

contract PortalsScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployerPublicKey = vm.addr(deployerPrivateKey);
        address CCIPRouter = vm.parseAddress("0x554472a2720e5e7d5d3c817529aba05eed5f82d8");
        address link = vm.parseAddress("0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846");
        address FunctionsRouter = vm.parseAddress("0xA9d587a00A31A52Ed70D6026794a8FC5E2F5dCb0");
        string memory donId = "fun-avalanche-fuji-1";   

        vm.startBroadcast(deployerPrivateKey);

        // Deploy Portals NFT Contract
        Portals portals = new Portals(deployerPublicKey, FunctionsRouter);
        address portalsAddress = address(portals);
        console.log("Portals Deployed to %s", portalsAddress);

        // Deploy Router Contract
        Router router = new Router(CCIPRouter, link, portalsAddress, donId);
        address routerAddress = address(router);
        console.log("Router Deployed to %s", routerAddress);

        // Set Router Address in Portals contract
        portals.setRouter(routerAddress);

        // Give Minter Permission and set Subscription Id
        router.setMinter(deployerPublicKey, true);
        router.setSubscriptionId(1516);

        vm.stopBroadcast();
    }
}
