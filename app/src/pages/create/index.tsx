import type { ReactElement } from 'react';
import { Layout } from '~/components';
import type { NextPageWithLayout } from '../_app';

import { UploadContent, ChainSelect, NFTDetails } from '~/components/create';

const Create: NextPageWithLayout = () => {
	return (
		<div className='px-4 py-24'>
			<div className='mx-auto max-w-screen-2xl text-3xl font-semibold text-gray-100'>
				Create a Content NFT
			</div>
			<div className='mx-auto flex max-w-screen-2xl flex-col gap-8 py-12 lg:flex-row'>
				<div className='flex w-full basis-2/3 flex-col gap-6'>
					<UploadContent />
					<ChainSelect />
					<NFTDetails />
				</div>
				<div className='w-full basis-1/3 border-2'>
					<div>preview nft</div>
					<div>traits inputs</div>
				</div>
			</div>
		</div>
	);
};

Create.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Create;
