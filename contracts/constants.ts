const routerConfig = {
	polygonMumbai: {
		router: '0x70499c328e1e2a3c41108bd3730f6670a44595d1',
		chain: 12532609583862916517,
		link: '0x326C977E6efc84E512bB9C30f76E30c160eD06FB',
	},
	fuji: {
		router: '0x554472a2720e5e7d5d3c817529aba05eed5f82d8',
		chain: 14767482510784806043,
		link: '0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846',
	},
};

type chains = keyof typeof routerConfig;

const getConfigForChain = (chain: chains) => {
	return routerConfig[chain];
};

/*

Deployed Addresses

Fuji

Router - 0x3b9A09147840FeC2B40234ca717C8DEEa13985Ba
Portals - 0x78D023dC5AB81d9D6A63a1fc3A54503fDA921769
Functions Subscription - https://functions.chain.link/fuji/1516
Automation Subscription - https://automation.chain.link/fuji/69150918762620993605215613243496993183524843408030451639662141418885985618390


Mumbai

Router - 0x3e81ADb2d5e250bFdE89B472EfF18E85938e8399
Portals - 0x3a4025fFF32FDd304e503f1Cca8173fFAC3fD17b
Functions Subscription - https://functions.chain.link/mumbai/979
Automation Subscription - https://automation.chain.link/mumbai/57722398432969380491685220700205044622963765696328206903423414925661863156189

*/
