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
