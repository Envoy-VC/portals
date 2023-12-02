import React from 'react';

interface Props {
	title: string;
	description: string;
}

const NFTDetails = ({ title, description }: Props) => {
	return (
		<div className='rounded-md border-[1px] border-[#D1D1D1] p-4'>
			<div className='flex flex-col gap-4'>
				<span className='text-2xl font-medium'>{title}</span>
				<p className='whitespace-pre-wrap'>{description}</p>
				<div className='flex flex-row gap-2 font-medium'>
					Owned by <span className='text-secondary'>0xBF4...ed23</span>
				</div>
			</div>
		</div>
	);
};

export default NFTDetails;
