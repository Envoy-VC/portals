/* eslint-disable react/display-name */
import { Image } from 'antd';
import React from 'react';
import { Button } from 'antd';
import html2canvas from 'html2canvas';

import { NFTPlaceholder } from '~/assets';

// Icons
import { TbCircleX } from 'react-icons/tb';

const NFTPreview = () => {
	const nftElement = React.createRef<HTMLDivElement>();
	const download = async () => {
		if (nftElement.current === null) return;
		console.log(nftElement.current);
		const canvas = await html2canvas(nftElement.current);
		const image = canvas.toDataURL('image/png', 1.0);
		console.log(image);
		const fakeLink = window.document.createElement('a');
		fakeLink.className = 'hidden';
		fakeLink.download = 'image';
		fakeLink.href = image;
		document.body.appendChild(fakeLink);
		fakeLink.click();
		document.body.removeChild(fakeLink);
		fakeLink.remove();
	};

	return (
		<div className='flex flex-col items-center justify-center gap-3'>
			<div className='text-center text-2xl font-medium'>NFT Preview</div>
			<NFTImage ref={nftElement} />
			<Button
				type='link'
				className='flex flex-row items-center gap-1 text-gray-400 hover:!text-gray-400'
			>
				<TbCircleX className='text-lg text-gray-400' />
				Clear All
			</Button>
		</div>
	);
};

interface NFTImageProps {
	chain?: string;
}

const NFTImage = React.forwardRef<HTMLDivElement, NFTImageProps>(
	(props, ref) => {
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
						<span>Water Color Illustration</span>
					</div>
				</div>
			</div>
		);
	}
);

export default NFTPreview;
