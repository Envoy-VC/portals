/* eslint-disable react/display-name */
import { Image } from 'antd';
import React from 'react';
import { Button } from 'antd';

import { useCreateNFTStore } from '~/stores';

import { NFTPlaceholder } from '~/assets';

// Icons
import { TbCircleX } from 'react-icons/tb';

const NFTPreview = React.forwardRef<HTMLDivElement, NFTImageProps>(
	(props, ref) => {
		return (
			<div className='flex flex-col items-center justify-center gap-3'>
				<div className='text-center text-2xl font-medium'>NFT Preview</div>
				<NFTImage ref={ref} />
				<Button
					type='link'
					className='flex flex-row items-center gap-1 text-gray-400 hover:!text-gray-400'
				>
					<TbCircleX className='text-lg text-gray-400' />
					Clear All
				</Button>
			</div>
		);
	}
);

interface NFTImageProps {
	chain?: string;
}

const NFTImage = React.forwardRef<HTMLDivElement, NFTImageProps>(
	(props, ref) => {
		const { name } = useCreateNFTStore();
		return (
			<div className='bg-transparent' ref={ref}>
				<div className='flex h-[450px] w-[350px] flex-col gap-8 rounded-2xl border-2 border-gray-100 bg-white p-3'>
					<div className='flex w-full justify-center'>
						<Image
							className='aspect-square w-full rounded-xl object-cover shadow-sm'
							src={NFTPlaceholder.src}
							alt='Portals Image'
							width={330}
							preview={false}
						/>
					</div>
					<div className='text-center text-xl font-medium text-slate-800'>
						<span>{name}</span>
					</div>
				</div>
			</div>
		);
	}
);

export default NFTPreview;
