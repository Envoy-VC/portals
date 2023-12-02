import React from 'react';
import type { ReactElement } from 'react';
import { Layout } from '~/components';
import type { NextPageWithLayout } from '../_app';

import { useRouter } from 'next/router';

import {
	NFTImage,
	NFTTraits,
	NFTDetails,
	DecryptContent,
	NFTActions,
} from '~/components/assets';

const supportedChains = ['mumbai', 'fuji'];

const Asset: NextPageWithLayout = () => {
	const router = useRouter();
	const slug = router.query?.slug as string[];
	const chain = slug?.at(0);
	const tokenId = slug?.at(1);

	if (!chain || !tokenId) {
		return <div>chain and token required</div>;
	} else if (!supportedChains.includes(chain)) {
		return <div>only mumbai and fuji supported</div>;
	} else
		return (
			<div className='mx-auto w-full max-w-screen-2xl py-12'>
				<div className='flex flex-col gap-10 px-2 lg:flex-row'>
					<div className='flex w-full basis-1/3 flex-col gap-8'>
						<NFTImage chain={chain} tokenId={tokenId} />
						<NFTTraits />
					</div>
					<div className='flex w-full basis-2/3 flex-col gap-6'>
						<NFTDetails />
						<DecryptContent />
						<NFTActions />
					</div>
				</div>
			</div>
		);
};

Asset.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Asset;
