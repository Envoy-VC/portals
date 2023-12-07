import React from 'react';
import { downloadFromIpfs } from '~/helpers';
import { useAddress } from '@thirdweb-dev/react';
import type { NFTMetadata } from '~/types';
import { callContractFunction } from '~/helpers';

import {
	NFTImage,
	NFTTraits,
	NFTDetails,
	DecryptContent,
	NFTActions,
} from '~/components/assets';

import { CgSpinner } from 'react-icons/cg';

interface Props {
	chain: string;
	tokenId: string;
}

const AssetPage = ({ chain, tokenId }: Props) => {
	const address = useAddress();

	const [owner, setOwner] = React.useState<string | null>(null);
	const [metadata, setMetadata] = React.useState<NFTMetadata | null>(null);
	const [loading, setLoading] = React.useState<boolean>(true);
	const [error, setError] = React.useState<string | null>(null);

	React.useEffect(() => {
		async function fetchMetadata() {
			try {
				setLoading(true);
				setError(null);
				const tokenURI = (await callContractFunction({
					chainId: chain === 'mumbai' ? '80001' : '43113',
					contract: 'portals',
					functionName: 'tokenURI',
					args: [tokenId],
				})) as string;
				if (tokenURI === '') {
					setError('Token does not exist');
					return;
				}
				const ownerAddr = (await callContractFunction({
					chainId: chain === 'mumbai' ? '80001' : '43113',
					contract: 'portals',
					functionName: 'ownerOf',
					args: [tokenId],
				})) as string;
				setOwner(ownerAddr);
				const metadata = await downloadFromIpfs(tokenURI);
				setMetadata(metadata);
			} catch (error) {
				setError('Token does not exist');
			} finally {
				setLoading(false);
			}
		}
		void fetchMetadata();
	}, []);

	if (loading) {
		return (
			<div className='py-16'>
				<div className='text-center text-xl font-semibold'>
					<CgSpinner className='mr-2 inline-block animate-spin' />
					Loading...
				</div>
			</div>
		);
	} else if (error ?? !metadata) {
		return (
			<div className='py-16'>
				<div className='text-center text-xl font-semibold'>{error}</div>
			</div>
		);
	} else if (metadata)
		return (
			<div className='mx-auto w-full max-w-screen-2xl py-12'>
				<div className='flex flex-col gap-10 px-2 lg:flex-row'>
					<div className='flex w-full basis-1/3 flex-col gap-8'>
						<NFTImage chain={chain} tokenId={tokenId} image={metadata.image} />
						<NFTTraits attributes={metadata.attributes} />
					</div>
					<div className='flex w-full basis-2/3 flex-col gap-6'>
						<NFTDetails
							title={metadata.name}
							description={metadata.description}
							owner={owner}
						/>
						<DecryptContent content={metadata.content} chain={chain} />
						{owner && owner === address && (
							<NFTActions chain={chain} tokenId={tokenId} />
						)}
					</div>
				</div>
			</div>
		);
};

export default AssetPage;
