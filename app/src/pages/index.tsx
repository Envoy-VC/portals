import type { ReactElement } from 'react';
import { Layout } from '~/components';
import type { NextPageWithLayout } from './_app';

// Sections
import { Hero } from '~/sections';

import { Button } from 'antd';

const Home: NextPageWithLayout = () => {
	const onClick = async () => {
		const res = await fetch('/api/update-acc', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				chainId: '1',
				tokenId: 5,
			}),
		});
		const json = (await res.json()) as { encodedBytes: string };
		console.log(json);
	};
	return (
		<div className=''>
			<Hero />
			<Button
				// eslint-disable-next-line @typescript-eslint/no-misused-promises
				onClick={onClick}
				className='hidden'
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
