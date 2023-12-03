import {
	Ethereum,
	Polygon,
	Avalanche,
	Optimism,
	Binance,
	Arbitrum,
	Mumbai,
	AvalancheFuji,
} from '@thirdweb-dev/chains';

export const chainInfo = {
	mumbai: {
		routerAddress: '0x71296ECE6d41d18afa1dfE0B98D1AF768df3553F',
		portalsAddress: '0xfa36ffd97f50c8dE61242c7D42EcCaCfab725d7F',
		chainId: 80001,
		chainSelector: '12532609583862916517',
	},
	fuji: {
		routerAddress: '0xfa36ffd97f50c8dE61242c7D42EcCaCfab725d7F',
		portalsAddress: '0x5F693b112d26872c1533921CcC735fdf37815847',
		chainId: 43113,
		chainSelector: '14767482510784806043',
	},
};

export const supportedChains = [
	{
		name: 'Ethereum',
		chain: Ethereum,
	},
	{
		name: 'Polygon',
		chain: Polygon,
	},
	{
		name: 'Avalanche',
		chain: Avalanche,
	},
	{
		name: 'Optimism',
		chain: Optimism,
	},
	{
		name: 'Binance',
		chain: Binance,
	},
	{
		name: 'Arbitrum',
		chain: Arbitrum,
	},
];
interface DeployedChain {
	name: string;
	icon: string;
	chainId: number;
}
export const deployedChains: DeployedChain[] = [
	{
		name: 'Polygon Mumbai',
		icon: Mumbai.icon.url,
		chainId: Mumbai.chainId,
	},
	{
		name: 'Avalanche Fuji',
		icon: AvalancheFuji.icon.url,
		chainId: AvalancheFuji.chainId,
	},
];

export const sanitizeImage = (image: string) => {
	if (image.startsWith('ipfs://')) {
		return 'https://ipfs.io/ipfs/' + image.replace('ipfs://', '');
	} else if (image.startsWith('https://')) {
		return image;
	} else return image;
};
