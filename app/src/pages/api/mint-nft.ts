import type { NextApiRequest, NextApiResponse } from 'next';
import { chainInfo } from '~/utils';
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { ROUTER_ABI } from '~/utils/abi';
import { AvalancheFuji, Mumbai } from '@thirdweb-dev/chains';
import { env } from '~/env.mjs';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const body = req.body as {
		chainId: string;
		address: string;
		uri: string;
	};
	const chainId = parseInt(body.chainId);
	const to = body.address;
	const uri = body.uri;
	const chain = chainId === 80001 ? 'mumbai' : 'fuji';
	const routerAddress = chainInfo[chain].routerAddress;
	const thirdwebChain = chain === 'mumbai' ? Mumbai : AvalancheFuji;
	const sdk = ThirdwebSDK.fromPrivateKey(env.PRIVATE_KEY, thirdwebChain, {
		secretKey: env.TW_SECRET,
	});

	const contract = await sdk.getContract(routerAddress, ROUTER_ABI);

	const data = (await contract.call('mint', [to, uri])) as {
		receipt: {
			transactionHash: string;
		};
	};
	console.log(data);

	res.status(200).json({
		txHash: data.receipt.transactionHash,
	});
}
