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
		routerAddress: '0x63A8291F8aD864BB9d8Bbccb64afAfa9dfD4B142',
		portalsAddress: '0x7f7f81a90A5a57C74eecFfCE672a52f615C64A78',
		chainId: 80001,
		chainSelector: '12532609583862916517',
	},
	fuji: {
		routerAddress: '0x07a34386C466DdB38157dD8683b36E8ca67BA726',
		portalsAddress: '0x5b6c20Ac8b1c8c825D2a250a3e2713F36402bE65',
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
