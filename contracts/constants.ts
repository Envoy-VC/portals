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

Router - 0xfa36ffd97f50c8dE61242c7D42EcCaCfab725d7F
Portals - 0x5F693b112d26872c1533921CcC735fdf37815847
Functions Subscription - https://functions.chain.link/fuji/1516
Automation Subscription - https://automation.chain.link/fuji/89816310624379382981794405856691243308543112757701006194161798023082391769830


Mumbai

Router - 0x71296ECE6d41d18afa1dfE0B98D1AF768df3553F
Portals - 0xfa36ffd97f50c8dE61242c7D42EcCaCfab725d7F
Functions Subscription - https://functions.chain.link/mumbai/979
Automation Subscription - https://automation.chain.link/mumbai/110943061178666321133766187458980813183031983335045509030041411979235889656351


In functions subscription -  Consumer will be Portals Contracts
In automation subscription - Automation Contract will be Router, Event emitting contract is Portals

*/
