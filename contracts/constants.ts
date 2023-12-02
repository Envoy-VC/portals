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

Router - 0x07a34386C466DdB38157dD8683b36E8ca67BA726
Portals - 0x5b6c20Ac8b1c8c825D2a250a3e2713F36402bE65
Functions Subscription - https://functions.chain.link/fuji/1516
Automation Subscription - https://automation.chain.link/fuji/72641771946286806535860734472655665887824763250913381830013500227435710295697


Mumbai

Router - 0x63A8291F8aD864BB9d8Bbccb64afAfa9dfD4B142
Portals - 0x7f7f81a90A5a57C74eecFfCE672a52f615C64A78
Functions Subscription - https://functions.chain.link/mumbai/979
Automation Subscription - https://automation.chain.link/mumbai/50436153289924074350642973684808162989839102892347712668378838286203397805587


In functions subscription -  Consumer will be Portals Contracts
In automation subscription - Automation Contract will be Router, Event emitting contract is Portals

*/
