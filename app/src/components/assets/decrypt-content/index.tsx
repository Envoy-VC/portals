import React from 'react';
import { Button } from 'antd';

const DecryptContent = () => {
	return (
		<div className='rounded-md border-[1px] border-[#D1D1D1] p-4'>
			<div className='flex flex-col gap-4'>
				<span className='text-2xl font-medium'>Decrypt Content</span>
				<span>
					<span className='font-medium'>Encrypted Content: </span>Lorem, ipsum dolor
					sit amet consectetur adipisicing elit
				</span>
				<Button className='w-fit' size='large'>
					Decrypt
				</Button>
			</div>
		</div>
	);
};

export default DecryptContent;
