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

Router - 
Portals - 
Functions Subscription - https://functions.chain.link/fuji/1516
Automation Subscription - 


Mumbai

Router - 0xc7643A58b262187c4888726A2fDE2dDfD429b7E7
Portals - 0xf3239a2bedDfAaa72c606483097CA8a4330ea7B0
Functions Subscription - https://functions.chain.link/mumbai/979
Automation Subscription - 


In functions subscription -  Consumer will be Portals Contracts
In automation subscription - Automation Contract will be Router, Event emitting contract is Portals

*/
