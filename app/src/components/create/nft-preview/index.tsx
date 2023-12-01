import { Image } from 'antd';
import React from 'react';
import { Button } from 'antd';

// Icons
import { TbCircleX } from 'react-icons/tb';

const NFTPreview = () => {
	return (
		<div className='flex flex-col items-center justify-center gap-3'>
			<div className='text-center text-2xl font-medium'>NFT Preview</div>
			<NFTImage />
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

const NFTImage = () => {
	return (
		<div className='flex h-[450px] w-[350px] flex-col gap-8 rounded-2xl border-2 border-gray-100 bg-white p-3'>
			<div className='flex w-full justify-center'>
				<Image
					className='aspect-square w-full rounded-xl object-cover shadow-sm'
					src='https://img.freepik.com/free-vector/abstract-optical-illusion-background_1048-12556.jpg?size=626&ext=jpg&ga=GA1.1.1157529725.1701282125&semt=ais'
					alt='Portals Image'
					width={330}
					preview={false}
				/>
			</div>
			<div className='text-center text-xl font-medium text-slate-800'>
				<span>Water Color Illustration</span>
			</div>
		</div>
	);
};

export default NFTPreview;
