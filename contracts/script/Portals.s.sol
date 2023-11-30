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
        address CCIPRouter = vm.parseAddress("0x70499c328e1e2a3c41108bd3730f6670a44595d1");
        address link = vm.parseAddress("0x326C977E6efc84E512bB9C30f76E30c160eD06FB");
        address FunctionsRouter = vm.parseAddress("0x6E2dc0F9DB014aE19888F539E59285D2Ea04244C");
        string memory donId = "fun-polygon-mumbai-1";

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
        router.setSubscriptionId(979);

        vm.stopBroadcast();
    }
}
