import React from 'react';
import type { ReactElement } from 'react';
import { Layout } from '~/components';
import type { NextPageWithLayout } from '../_app';

import { useRouter } from 'next/router';
import { AssetPage } from '~/sections';

const supportedChains = ['mumbai', 'fuji'];

const Asset: NextPageWithLayout = () => {
	const router = useRouter();
	const slug = router.query?.slug as string[];
	const chain = slug?.at(0);
	const tokenId = slug?.at(1);

	if (!chain || !tokenId) {
		return <ErrorMessage message='Invalid URL' />;
	} else if (!supportedChains.includes(chain)) {
		return <ErrorMessage message='Unsupported Chain' />;
	} else return <AssetPage chain={chain} tokenId={tokenId} />;
};

const ErrorMessage = ({ message }: { message: string }) => {
	return (
		<div className='py-16'>
			<div className='text-center text-xl font-semibold'>{message}</div>
		</div>
	);
};

Asset.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Asset;
