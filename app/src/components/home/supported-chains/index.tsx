import React from 'react';
import { Avatar } from 'antd';

import { supportedChains } from '~/utils';

// Icons
import { TbJewishStarFilled } from 'react-icons/tb';

const SupportedChains = () => {
	return (
		<div>
			<div className='supportedChainBg relative mx-auto max-w-[1125px] overflow-x-hidden py-[2px]'>
				<div className='w-full bg-black'>
					<div className='animate-marquee mx-auto flex w-full max-w-[1125px] flex-row items-center justify-center gap-6 py-8'>
						{supportedChains.map((chain, index) => {
							const imageUrl = 'https://ipfs.io/ipfs/' + chain.chain.icon.url.slice(7);
							return (
								<div key={index} className='flex flex-row items-center'>
									<div className='flex flex-row items-center gap-2'>
										<Avatar src={imageUrl} alt={chain.name} size={32} />
										<span className='text-xl font-semibold text-[#ffffffd8]'>
											{chain.name}
										</span>
									</div>

									<TbJewishStarFilled className='ml-6 text-xs text-gray-300' />
								</div>
							);
						})}
					</div>
					<div className='animate-marquee2 absolute top-[2px] mx-auto hidden w-full max-w-[1125px] flex-row items-center justify-center gap-6 py-8 lg:flex'>
						{supportedChains.map((chain, index) => {
							const imageUrl = 'https://ipfs.io/ipfs/' + chain.chain.icon.url.slice(7);
							return (
								<div key={index} className='flex flex-row items-center'>
									<div className='flex flex-row items-center gap-2'>
										<Avatar src={imageUrl} alt={chain.name} size={32} />
										<span className='text-xl font-semibold text-[#ffffffd8]'>
											{chain.name}
										</span>
									</div>

									<TbJewishStarFilled className='ml-6 text-xs text-gray-300' />
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SupportedChains;
