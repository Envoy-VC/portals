import React from 'react';
import type { ReactElement } from 'react';
import { Layout } from '~/components';
import type { NextPageWithLayout } from '../_app';

import { useStorage, useAddress } from '@thirdweb-dev/react';

import toast from 'react-hot-toast';
import html2canvas from 'html2canvas';
import { buildMetadata, mintNFT, getNextTokenId, testUpdate } from '~/helpers';

import { useCreateNFTStore } from '~/stores';

import {
	UploadContent,
	ChainSelect,
	NFTDetails,
	NFTPreview,
	NFTTraits,
} from '~/components/create';

import { Button } from 'antd';

import { CgSpinner } from 'react-icons/cg';

const Create: NextPageWithLayout = () => {
	const address = useAddress();
	const nftPreview = React.createRef<HTMLDivElement>();
	const [previewFile, setPreviewFile] = React.useState<File | null>(null);
	const { name, description, content, chainId, attributes, reset } =
		useCreateNFTStore();
	const storage = useStorage();
	const [loading, setLoading] = React.useState<boolean>(false);

	const uploadNFTImage = async () => {
		if (nftPreview.current === null) return;
		console.log(nftPreview.current);
		const canvas = await html2canvas(nftPreview.current);

		canvas.toBlob(
			(blob) => {
				if (!blob) return;
				const file = new File([blob], 'image.png', {
					type: 'image/png',
				});
				setPreviewFile(file);
			},
			'image/png',
			1.0
		);
		if (!previewFile) return;
		const hash = await storage?.upload(previewFile, {
			uploadWithoutDirectory: true,
		});
		return hash;
	};

	const onCreate = async () => {
		if (!address) {
			toast.error('Connect your Wallet to create a NFT');
			return;
		}
		if (name === '' || description === '' || content === null) {
			toast.error('Please fill in all fields');
			return;
		}
		try {
			setLoading(true);
			// Upload Image
			const imageHash = await uploadNFTImage();
			if (!imageHash) return;
			console.log('Image Hash', imageHash);

			// Upload Content
			const contentHash = await storage?.upload(content, {
				uploadWithoutDirectory: true,
			});
			if (!contentHash) return;
			console.log('Content Hash', contentHash);

			// Build Metadata
			const nextTokenId = await getNextTokenId({
				chainId,
			});

			console.log(nextTokenId);

			const uri = await buildMetadata({
				name,
				description,
				image: imageHash,
				contentHash,
				attributes,
				chainId,
				tokenId: nextTokenId,
			});
			console.log('URI', uri);

			const txHash = await mintNFT({
				chainId,
				address: address,
				uri,
			});
			if (!txHash) return;
			console.log('TX Hash', txHash);
			const testRes = await testUpdate();
			console.log('Update URI Response: ', testRes);

			toast.success(`NFT with Token Id ${nextTokenId} Minted Successfully`);
			reset();
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='px-4 py-24'>
			<div className='mx-auto flex max-w-screen-2xl flex-col items-center justify-between sm:flex-row'>
				<div className='text-3xl font-semibold dark:text-gray-100 '>
					Create a Content NFT
				</div>
				<Button
					type='primary'
					size='large'
					className='hidden items-center justify-center gap-2 border-gray-400 bg-black !text-white hover:!bg-black disabled:!text-gray-300 dark:border-2 sm:flex'
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					onClick={onCreate}
					disabled={loading}
				>
					{loading ? (
						<CgSpinner className='animate-spin text-xl text-black dark:text-white' />
					) : (
						'Create'
					)}
				</Button>
			</div>
			<div className='mx-auto flex max-w-screen-2xl flex-col gap-8 py-12 lg:flex-row'>
				<div className='order-2 flex w-full basis-2/3 flex-col gap-6 lg:order-1'>
					<UploadContent />
					<ChainSelect />
					<NFTDetails />
				</div>
				<div className='order-1 flex w-full basis-1/3 flex-col gap-8 lg:order-2'>
					<NFTPreview ref={nftPreview} />
					<NFTTraits />
				</div>
			</div>
			<div className='flex justify-center'>
				<Button
					type='primary'
					size='large'
					className='flex bg-black !text-white hover:!bg-black sm:hidden'
					// eslint-disable-next-line @typescript-eslint/no-misused-promises
					onClick={onCreate}
					disabled={loading}
				>
					{loading ? (
						<CgSpinner className='animate-spin text-xl text-black dark:text-white' />
					) : (
						'Create'
					)}
				</Button>
			</div>
		</div>
	);
};

Create.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Create;
