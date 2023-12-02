import type { NextApiRequest, NextApiResponse } from 'next';
import { chainInfo } from '~/utils';
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { PORTALS_ABI } from '~/utils/abi';
import { AvalancheFuji, Mumbai } from '@thirdweb-dev/chains';
import { env } from '~/env.mjs';
import { BigNumber } from 'ethers';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const body = req.body as {
		chainId: string;
	};
	const chainId = parseInt(body.chainId);
	const chain = chainId === 80001 ? 'mumbai' : 'fuji';
	const portalsAddress = chainInfo[chain].portalsAddress;
	const thirdwebChain = chain === 'mumbai' ? Mumbai : AvalancheFuji;
	const sdk = ThirdwebSDK.fromPrivateKey(env.PRIVATE_KEY, thirdwebChain, {
		secretKey: env.TW_SECRET,
	});

	const contract = await sdk.getContract(portalsAddress, PORTALS_ABI);
	const nextTokenId = (await contract.call('_nextTokenId', [])) as BigNumber;
	// convert hex to number

	res.status(200).json({ nextTokenId: nextTokenId.toString() });
}
