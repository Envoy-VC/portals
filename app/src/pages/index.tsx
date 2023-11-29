import type { ReactElement } from 'react';
import { Layout } from '~/components';
import type { NextPageWithLayout } from './_app';

import { Button } from 'antd';

const Home: NextPageWithLayout = () => {
	const onClick = async () => {
		const res = await fetch('/api/update-acc', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				chainId: "80001",
				tokenId: "5",
			}),
		});
		const data = (await res.json()) as { encodedBytes: string };
		console.log(data);
	};
	return (
		<div className='flex h-screen items-center justify-center p-24'>
			<Button
				// eslint-disable-next-line @typescript-eslint/no-misused-promises
				onClick={onClick}
				className='bg-blue-500'
				size='large'
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
