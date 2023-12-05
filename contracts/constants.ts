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

Router - 0x624A9104f594b943254620d19371212C7Aa2a3a8
Portals - 0x15A552010D8bba68034EC4E8Fcc2CfDaFc0DE8E9
Functions Subscription - https://functions.chain.link/fuji/1516
Automation Subscription - https://automation.chain.link/fuji/10013484446831437677184902378559614187621707955900795943372880151634859699701


Mumbai

Router - 0x67bd320CF5B75e04694F4c84Aa8898c6B9DeB30a
Portals - 0xF66fdE3208b0855EE97035bF28112d383CdAD86e
Functions Subscription - https://functions.chain.link/mumbai/979
Automation Subscription - https://automation.chain.link/mumbai/53852294395387212749523118815082309718236198448956367777703582160615461456762


In functions subscription -  Consumer will be Portals Contracts
In automation subscription - Automation Contract will be Router, Event emitting contract is Portals

*/
