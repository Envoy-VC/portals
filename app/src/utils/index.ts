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
		routerAddress: '0xAa4806759408Ee70694ffa55CB4122e096695CEc',
		portalsAddress: '0xee5658a681EfA52f7c6a0d7af79a8b95FbF5ABd7',
		chainId: 80001,
		chainSelector: '12532609583862916517',
	},
	fuji: {
		routerAddress: '0x7A0ac4678a267BE852d99e6C57841DDE9c1CCeC0',
		portalsAddress: '0xAa4806759408Ee70694ffa55CB4122e096695CEc',
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
