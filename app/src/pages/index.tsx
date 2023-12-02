import type { ReactElement } from 'react';
import { Layout } from '~/components';
import type { NextPageWithLayout } from './_app';

import { uploadToIpfs, downloadFromIpfs } from '~/helpers';

// Sections
import { Hero } from '~/sections';

import { Button } from 'antd';

const Home: NextPageWithLayout = () => {
	const upload = async () => {
		const json = {
			name: 'test',
			description: 'test',
			image: 'test',
			attributes: [
				{
					trait_type: 'test',
					value: 'test',
				},
				{
					trait_type: 'test',
					value: 'test',
				},
			],
			external_url: 'test',
			content: {
				encryptedString: 'VTCumpQUqkTvG30KT0RhJTlzs2DVPkQvYLwRlwPWGFM',
				encryptedSymmetricKey:
					'1815098158342ce8752e428dce71cc2bf3c71b178d4790955a3dee36787eb551d4564b094d405f2af9f672b8621ae40bd250f092b170b86092b6a0546584a98f267178fc1257414ba64f97d83697f26723e34cfaba1498d4c82a44c7695ce296bf5574b34dc1fed3c3ac088f2f04a801d6fbedba427639b51f9744b19bf970d30000000000000020e87f2ca5114e2b3683485d46e932c20c2cb5678cdf4794a499a2c252670f6e9af3daf509fc051f2e14220ca056e08393',
				accessControlConditions: [
					{
						conditionType: 'evmBasic',
						contractAddress: '',
						standardContractType: '',
						chain: 'mumbai',
						method: '',
						parameters: [':userAddress'],
						returnValueTest: {
							comparator: '=',
							value: '0xe269688F24e1C7487f649fC3dCD99A4Bf15bDaA1',
						},
					},
					{ operator: 'or' },
					{
						conditionType: 'evmBasic',
						contractAddress: '0xe269688F24e1C7487f649fC3dCD99A4Bf15bDaA1',
						standardContractType: 'ERC721',
						chain: 'mumbai',
						method: 'ownerOf',
						parameters: [`5`],
						returnValueTest: {
							comparator: '=',
							value: ':userAddress',
						},
					},
				],
			},
		};
		const result = await uploadToIpfs(JSON.stringify(json));
		console.log(result);
	};
	const download = async () => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const result = await downloadFromIpfs(
			'ipfs://QmXFoSGnG7a9CwkvY6L2YfFe1c8JsECfe9EmoyUMBjdXfk'
		);
		console.log(result);
	};
	return (
		<div className=''>
			<Hero />
			<Button
				// eslint-disable-next-line @typescript-eslint/no-misused-promises
				onClick={download}
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
