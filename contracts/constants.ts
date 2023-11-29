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

FUJI
Portals - 0x8f966BC6Ad2D241a01C1f7634C47c7419Ce96830
Minter - 0xe86b1899376c77e1a109eA2124E462EF58E56897

Mumbai
Portals - 0xC360D4C071734F409aa899BFb73EF5c8d7f3F0Bf
Minter - 0x6737a06B4cE59AAe48Fbf3aEf3E1332229Cd0772

*/
