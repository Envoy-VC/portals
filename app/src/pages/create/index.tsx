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

const Create: NextPageWithLayout = () => {
	return (
		<div className='px-4 py-24'>
			<div className='mx-auto max-w-screen-2xl text-3xl font-semibold dark:text-gray-100'>
				Create a Content NFT
			</div>
			<div className='mx-auto flex max-w-screen-2xl flex-col gap-8 py-12 lg:flex-row'>
				<div className='flex w-full basis-2/3 flex-col gap-6'>
					<UploadContent />
					<ChainSelect />
					<NFTDetails />
				</div>
				<div className='flex w-full basis-1/3 flex-col gap-8'>
					<NFTPreview />
					<NFTTraits />
				</div>
			</div>
		</div>
	);
};

Create.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Create;
