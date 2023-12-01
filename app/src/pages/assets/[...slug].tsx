import React from 'react';
import type { ReactElement } from 'react';
import { Layout } from '~/components';
import type { NextPageWithLayout } from '../_app';

import { useRouter } from 'next/router';

import { NFTImage } from '~/components/assets';

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
			<div className='mx-auto h-screen w-full max-w-screen-2xl py-12'>
				<div className='flex flex-col gap-10 lg:flex-row'>
					<div className='w-full basis-1/3'>
						<NFTImage chain={chain} tokenId={tokenId} />
					</div>
					<div className='w-full basis-2/3 border-2 p-4'></div>
				</div>
			</div>
		);
};

Asset.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Asset;
