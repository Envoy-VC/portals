import React from 'react';

const NFTDetails = () => {
	return (
		<div className='rounded-md border-[1px] border-[#D1D1D1] p-4'>
			<div className='flex flex-col gap-4'>
				<span className='text-2xl font-medium'>Watercolor Painting Abstract</span>
				<p className='whitespace-pre-wrap'>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde ipsum
					quisquam exercitationem provident odio enim, excepturi vel commodi
					molestiae repellendus quibusdam. Magnam officiis corporis qui earum rem
					repudiandae debitis sed?
				</p>
				<div className='flex flex-row gap-2 font-medium'>
					Owned by <span className='text-secondary'>0xBF4...ed23</span>
				</div>
			</div>
		</div>
	);
};

export default NFTDetails;
