import React from 'react';
import { Button } from 'antd';
import type { UnifiedAccessControlConditions } from '@lit-protocol/types';

interface Props {
	content: {
		encryptedString: string;
		encryptedSymmetricKey: string;
		accessControlConditions: UnifiedAccessControlConditions;
	};
}

const DecryptContent = ({ content }: Props) => {
	const { encryptedString, encryptedSymmetricKey, accessControlConditions } =
		content;
	return (
		<div className='rounded-md border-[1px] border-[#D1D1D1] p-4'>
			<div className='flex flex-col gap-4'>
				<span className='text-2xl font-medium'>Decrypt Content</span>
				<span>
					<span className='font-medium'>Encrypted Content: </span>
					{encryptedString}
				</span>
				<Button className='w-fit' size='large'>
					Decrypt
				</Button>
			</div>
		</div>
	);
};

export default DecryptContent;
