import { Button } from 'antd';
import React from 'react';
import { useRouter } from 'next/router';

import { SupportedChains } from '~/components/home';

// Icons
import { GiPortal } from 'react-icons/gi';

const Hero = () => {
	const router = useRouter();

	return (
		<div className='h-screen py-24'>
			<div className='mx-auto flex max-w-screen-xl flex-col gap-6 '>
				<h1 className='text-center text-5xl font-semibold md:text-8xl'>
					Discover the power of cross-chain content NFTs
				</h1>
				<h2 className='mx-auto text-center text-sm text-gray-500 md:text-xl'>
					The future of NFTs is cross-chain, content-driven, and owner-controlled.
				</h2>
			</div>
			<div className='mx-auto w-fit py-12'>
				<Button
					type='primary'
					size='large'
					shape='round'
					className='group !flex !flex-row !items-center !gap-2 !bg-primary !text-black transition-all duration-300 ease-out hover:scale-105 hover:!bg-primary hover:!text-black !px-8 !py-5 !text-xl font-semibold'
					onClick={() => {
						void router.push('/create');
					}}
				>
					Create
				</Button>
			</div>
			<div>
				<SupportedChains />
			</div>
		</div>
	);
};

export default Hero;
