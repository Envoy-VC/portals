import type { NextApiRequest, NextApiResponse } from 'next';
import { chainInfo } from '~/utils';
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { PORTALS_ABI, ROUTER_ABI } from '~/utils/abi';

import { env } from '~/env.mjs';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const body = req.body as {
		chainId: string;
		contract: 'portals' | 'router';
		functionName: string;
		args: (string | number)[];
	};
	const chainId = parseInt(body.chainId);
	const chain = chainId === 80001 ? 'mumbai' : 'fuji';
	const contractAddress =
		body.contract === 'portals'
			? chainInfo[chain].portalsAddress
			: chainInfo[chain].routerAddress;
	const ABI = body.contract === 'portals' ? PORTALS_ABI : ROUTER_ABI;

	const sdk = ThirdwebSDK.fromPrivateKey(env.PRIVATE_KEY, chain, {
		secretKey: env.TW_SECRET,
	});

	const contract = await sdk.getContract(contractAddress, ABI);
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unnecessary-type-assertion, @typescript-eslint/no-explicit-any
	const data = (await contract.call(body.functionName, body.args)) as any;

	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	res.status(200).json({ data });
}
