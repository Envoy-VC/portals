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

Router - 0x7A0ac4678a267BE852d99e6C57841DDE9c1CCeC0
Portals - 0xAa4806759408Ee70694ffa55CB4122e096695CEc
Functions Subscription - https://functions.chain.link/fuji/1516
Automation Subscription - https://automation.chain.link/fuji/48580927475978770151216788508557731071541536862417570818292217495034453806088


Mumbai

Router - 0xAa4806759408Ee70694ffa55CB4122e096695CEc
Portals - 0xee5658a681EfA52f7c6a0d7af79a8b95FbF5ABd7
Functions Subscription - https://functions.chain.link/mumbai/979
Automation Subscription - https://automation.chain.link/mumbai/104875060133259684375993920867718878699574224543220066504378058541394183844900


In functions subscription -  Consumer will be Portals Contracts
In automation subscription - Automation Contract will be Router, Event emitting contract is Portals

*/
