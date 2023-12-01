import type { ReactElement } from 'react';
import { Layout } from '~/components';
import type { NextPageWithLayout } from '../_app';

import {
	UploadContent,
	ChainSelect,
	NFTDetails,
	NFTPreview,
	NFTTraits,
} from '~/components/create';

import { Button } from 'antd';

const Create: NextPageWithLayout = () => {
	return (
		<div className='px-4 py-24'>
			<div className='mx-auto flex max-w-screen-2xl flex-col items-center justify-between sm:flex-row'>
				<div className='text-3xl font-semibold dark:text-gray-100 '>
					Create a Content NFT
				</div>
				<Button
					type='primary'
					size='large'
					className='hidden bg-black !text-white hover:!bg-black sm:flex'
				>
					Create
				</Button>
			</div>
			<div className='mx-auto flex max-w-screen-2xl flex-col gap-8 py-12 lg:flex-row'>
				<div className='order-2 flex w-full basis-2/3 flex-col gap-6 lg:order-1'>
					<UploadContent />
					<ChainSelect />
					<NFTDetails />
				</div>
				<div className='order-1 flex w-full basis-1/3 flex-col gap-8 lg:order-2'>
					<NFTPreview />
					<NFTTraits />
				</div>
			</div>
			<div className='flex justify-center'>
				<Button
					type='primary'
					size='large'
					className='flex bg-black !text-white hover:!bg-black sm:hidden'
				>
					Create
				</Button>
			</div>
		</div>
	);
};

Create.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Create;
