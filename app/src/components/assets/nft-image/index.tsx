import React from 'react';
import Link from 'next/link';
import { Avatar, Image } from 'antd';
import { Avalanche, Polygon } from '@thirdweb-dev/chains';

import { NFTPreviewImage } from '~/assets';

import { SiOpensea } from 'react-icons/si';

interface NFTImageProps {
	chain: string;
	tokenId: string;
}

const NFTImage = ({ chain, tokenId }: NFTImageProps) => {
	const getChainInfo = () => {
		switch (chain) {
			case 'fuji':
				return {
					name: 'Avalanche Fuji',
					logo: 'https://ipfs.io/ipfs/' + Avalanche.icon.url.slice(7),
					opensea: `https://testnets.opensea.io/assets/avalanche-fuji/0x8f966bc6ad2d241a01c1f7634c47c7419ce96830/${tokenId}`,
				};
			case 'mumbai':
				return {
					name: 'Polygon Mumbai',
					logo: 'https://ipfs.io/ipfs/' + Polygon.icon.url.slice(7),
					opensea: `https://testnets.opensea.io/assets/mumbai/0x8f966bc6ad2d241a01c1f7634c47c7419ce96830/${tokenId}`,
				};
			default:
				return {
					name: '',
					logo: '',
					opensea: '',
				};
		}
	};
	return (
		<div className='flex flex-col gap-2 rounded-xl border-[1px] border-gray-200 dark:border-gray-700'>
			<div className='flex flex-row items-center justify-between gap-2 rounded-t-xl bg-gray-50 px-4 py-2 dark:bg-[#121212]'>
				<div className='flex flex-row items-center gap-2'>
					<Avatar src={getChainInfo().logo} size={20} />
					<div className='text-lg font-medium'>{getChainInfo().name}</div>
				</div>
				<Link href={getChainInfo().opensea} target='_blank'>
					<SiOpensea className='text-lg text-blue-500' />
				</Link>
			</div>
			<div className='flex justify-center p-2'>
				<Image
					src={NFTPreviewImage.src}
					alt='NFT Preview'
					className='w-full max-w-[400px] '
					preview={false}
				/>
			</div>
		</div>
	);
};

export default NFTImage;
