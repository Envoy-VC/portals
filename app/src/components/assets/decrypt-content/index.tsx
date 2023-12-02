import React from 'react';
import { Button } from 'antd';
import {
	checkAndSignAuthMessage,
	decryptString,
	LitNodeClient,
} from '@lit-protocol/lit-node-client';

import { base64StringToBlob } from '@lit-protocol/lit-node-client';

import type { UnifiedAccessControlConditions } from '@lit-protocol/types';
import toast from 'react-hot-toast';

interface Props {
	chain: string;
	content: {
		encryptedString: string;
		encryptedSymmetricKey: string;
		accessControlConditions: UnifiedAccessControlConditions;
	};
}

const DecryptContent = ({ chain, content }: Props) => {
	const { encryptedString, encryptedSymmetricKey, accessControlConditions } =
		content;

	const [decryptedString, setDecryptedString] = React.useState<string | null>(
		null
	);

	const decrypt = async () => {
		try {
			const client = new LitNodeClient({
				litNetwork: 'serrano',
			});
			await client.connect();

			const authSig = await checkAndSignAuthMessage({
				chain: chain,
			});

			const symmetricKey = await client.getEncryptionKey({
				unifiedAccessControlConditions: accessControlConditions,
				toDecrypt: encryptedSymmetricKey,
				chain,
				authSig,
			});

			const decrypted = await decryptString(
				base64StringToBlob(encryptedString),
				symmetricKey
			);

			setDecryptedString(decrypted);
		} catch (error) {
			console.log(error);
			toast.error('Error decrypting content');
		}
	};
	return (
		<div className='rounded-md border-[1px] border-[#D1D1D1] p-4'>
			<div className='flex flex-col gap-4'>
				<span className='text-2xl font-medium'>Decrypt Content</span>
				<p className='break-all'>
					<span className='font-medium'>Encrypted Content: </span>
					{encryptedString}
				</p>
				{decryptedString && (
					<p className='break-all'>
						<span className='font-medium'>Decrypted Content: </span>
						{decryptedString}
					</p>
				)}
				<Button
					className='w-fit'
					size='large'
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					onClick={decrypt}
				>
					Decrypt
				</Button>
			</div>
		</div>
	);
};

export default DecryptContent;
