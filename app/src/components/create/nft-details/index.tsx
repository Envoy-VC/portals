import React from 'react';
import { FormInput, FormTextarea } from '~/components/common';

const NFTDetails = () => {
	return (
		<div className='flex flex-col gap-3 py-4 dark:text-gray-200'>
			<div className='text-3xl font-medium'>Item Details</div>
			<div className='flex flex-col gap-2'>
				<div className='flex flex-col gap-2'>
					<div className='text-lg font-medium'>Title</div>
					<FormInput size='large' placeholder='eg- Watercolor Art File' />
				</div>
				<div className='flex flex-col gap-2'>
					<div className='text-lg font-medium'>Description</div>
					<FormTextarea
						size='large'
						placeholder='eg- This is a watercolor digital art made on Adobe Illustration'
						rows={6}
					/>
				</div>
			</div>
		</div>
	);
};

export default NFTDetails;
