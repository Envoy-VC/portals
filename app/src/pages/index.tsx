import type { ReactElement } from 'react';
import { Layout } from '~/components';
import type { NextPageWithLayout } from './_app';

import { uploadToIpfs, downloadFromIpfs } from '~/helpers';

// Sections
import { Hero } from '~/sections';

import { Button } from 'antd';

const Home: NextPageWithLayout = () => {
	const update = async () => {
		const res = await fetch('/api/update-acc', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				chainId: '43113',
				tokenId: '1',
				uri: 'ipfs://QmZArG6TsAd5xfXsDpAQ9ASDcip1As61X6WTdy1ZXCiZeK',
			}),
		});

		const json = (await res.json()) as string;
		console.log(json);
	};
	return (
		<div className=''>
			<Hero />
			<Button
				// eslint-disable-next-line @typescript-eslint/no-misused-promises
				onClick={update}
			>
				Click
			</Button>
		</div>
	);
};

Home.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Home;
