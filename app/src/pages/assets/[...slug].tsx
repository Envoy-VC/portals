import React from 'react';
import type { ReactElement } from 'react';
import { Layout } from '~/components';
import type { NextPageWithLayout } from '../_app';

import { useRouter } from 'next/router';

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
			<div>
				<h1>
					Asset on chain {chain} with token id {tokenId}
				</h1>
			</div>
		);
};

Asset.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Asset;
