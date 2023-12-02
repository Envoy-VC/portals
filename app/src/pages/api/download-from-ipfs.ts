import type { NextApiRequest, NextApiResponse } from 'next';
import { ThirdwebStorage } from '@thirdweb-dev/storage';
import type { NFTMetadata } from '~/types';

import { env } from '~/env.mjs';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const body = req.body as {
		hash: string;
	};
	const hash = body.hash;

	const storage = new ThirdwebStorage({
		secretKey: env.TW_SECRET,
	});

	const data: NFTMetadata = await storage.downloadJSON(hash);

	res.status(200).json({
		data,
	});
}
