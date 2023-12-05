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
		routerAddress: '0x67bd320CF5B75e04694F4c84Aa8898c6B9DeB30a',
		portalsAddress: '0xF66fdE3208b0855EE97035bF28112d383CdAD86e',
		chainId: 80001,
		chainSelector: '12532609583862916517',
	},
	fuji: {
		routerAddress: '0x624A9104f594b943254620d19371212C7Aa2a3a8',
		portalsAddress: '0x15A552010D8bba68034EC4E8Fcc2CfDaFc0DE8E9',
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
