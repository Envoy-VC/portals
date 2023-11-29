// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import "../src/Portals.sol";
import "../src/Router.sol";

contract PortalsScriptMumbai is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address deployerPublicKey = vm.addr(deployerPrivateKey);
        vm.startBroadcast(deployerPrivateKey);

        // Deploy Portals NFT Contract
        Portals portals = new Portals(deployerPublicKey, vm.parseAddress("0x6E2dc0F9DB014aE19888F539E59285D2Ea04244C"));
        address portalsAddress = address(portals);
        console.log("Portals Deployed to %s", portalsAddress);

        // Deploy Minter Contract
        string memory mumbaiRouter = "0x70499c328e1e2a3c41108bd3730f6670a44595d1";
        string memory mumbaiLink = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
        Router router = new Router(
            vm.parseAddress(mumbaiRouter), vm.parseAddress(mumbaiLink), portalsAddress, "fun-polygon-mumbai-1"
        );
        address routerAddress = address(router);
        console.log("Minter Deployed to %s", routerAddress);

        // Set Minter Address
        portals.setRouter(routerAddress);

        vm.stopBroadcast();
    }
}
