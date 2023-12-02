import React from 'react';

interface Props {
	title: string;
	description: string;
	owner: string | null;
}

const NFTDetails = ({ title, description, owner }: Props) => {
	return (
		<div className='rounded-md border-[1px] border-[#D1D1D1] p-4'>
			<div className='flex flex-col gap-4'>
				<span className='text-2xl font-medium'>{title}</span>
				<p className='whitespace-pre-wrap'>{description}</p>
				<div className='flex flex-row gap-2 font-medium'>
					Owned by{' '}
					<span className='text-secondary'>
						{owner && owner.slice(0, 6) + '...' + owner.slice(-6)}
					</span>
				</div>
			</div>
		</div>
	);
};

export default NFTDetails;
