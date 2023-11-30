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

Router - 0x35B9735CBd4e7Af1532aB2449Ce67Bd308539324
Portals - 0x12d854fccBf99dAd1d445cd741AC353e8d211E18
Functions Subscription - https://functions.chain.link/fuji/1516
Automation Subscription - https://automation.chain.link/fuji/30639587551351841759240286956000535517721002197692298165509602739266882274148


Mumbai

Router - 0x57715fFaC87ca0d4b6C251467995fB59989c766b
Portals - 0x761C1f4acCaE40B6F7068791307710AaCDB11Ad5
Functions Subscription - https://functions.chain.link/mumbai/979
Automation Subscription - https://automation.chain.link/mumbai/109650227050503539409677581393538638995138077298561471877700723870669320844539


In functions subscription -  Consumer will be Portals Contracts
In automation subscription - Automation Contract will be Router, Event emitting contract is Portals

*/
