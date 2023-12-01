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

Router - 0x5323cfF72Ce529Bcb5E75E99534Ca0b309e07F55
Portals - 0xd475af53B4619f2C9DB42fa01E24b1F548721037
Functions Subscription - https://functions.chain.link/fuji/1516
Automation Subscription - 


Mumbai

Router - 0x99B9fa6F53ecfe27361ACE20F8f25C0c3E8FDfCb
Portals - 0x2136139ea172E7Ff32b6abd9344D931b0a13cCBF
Functions Subscription - https://functions.chain.link/mumbai/979
Automation Subscription - https://automation.chain.link/mumbai/111945855186033816184924763968052023998732000653203860008276620370082983954353


In functions subscription -  Consumer will be Portals Contracts
In automation subscription - Automation Contract will be Router, Event emitting contract is Portals

*/
