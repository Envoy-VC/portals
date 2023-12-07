import type { ReactElement } from 'react';
import { Layout } from '~/components';
import type { NextPageWithLayout } from './_app';

// Sections
import { Hero } from '~/sections';

const Home: NextPageWithLayout = () => {
	return (
		<div className=''>
			<Hero />
		</div>
	);
};

Home.getLayout = function getLayout(page: ReactElement) {
	return <Layout>{page}</Layout>;
};

export default Home;
