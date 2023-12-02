import React from 'react';
import { downloadFromIpfs } from '~/helpers';

import type { NFTMetadata } from '~/types';
import { callContractFunction } from '~/helpers';

import {
	NFTImage,
	NFTTraits,
	NFTDetails,
	DecryptContent,
	NFTActions,
} from '~/components/assets';

interface Props {
	chain: string;
	tokenId: string;
}

const AssetPage = ({ chain, tokenId }: Props) => {
	const [metadata, setMetadata] = React.useState<NFTMetadata | null>(null);

	React.useEffect(() => {
		async function fetchMetadata() {
			const tokenURI = (await callContractFunction({
				chainId: chain === 'mumbai' ? '80001' : '43113',
				contract: 'portals',
				functionName: 'tokenURI',
				args: [tokenId],
			})) as string;
			const metadata = await downloadFromIpfs(tokenURI);
			setMetadata(metadata);
		}
		void fetchMetadata();
	}, []);
	if (metadata)
		return (
			<div className='mx-auto w-full max-w-screen-2xl py-12'>
				<div className='flex flex-col gap-10 px-2 lg:flex-row'>
					<div className='flex w-full basis-1/3 flex-col gap-8'>
						<NFTImage chain={chain} tokenId={tokenId} image={metadata.image} />
						<NFTTraits />
					</div>
					<div className='flex w-full basis-2/3 flex-col gap-6'>
						<NFTDetails title={metadata.name} description={metadata.description} />
						<DecryptContent content={metadata.content} />
						<NFTActions />
					</div>
				</div>
			</div>
		);
};

export default AssetPage;
