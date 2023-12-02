import type { NextApiRequest, NextApiResponse } from 'next';
import { ThirdwebStorage } from '@thirdweb-dev/storage';
import type { NFTMetadata } from '~/types';

import { env } from '~/env.mjs';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const body = req.body as {
		content: string;
	};
	const content = JSON.parse(body.content) as NFTMetadata;

	const storage = new ThirdwebStorage({
		secretKey: env.TW_SECRET,
	});

	const uri = await storage.upload(content, {
		uploadWithoutDirectory: true,
	});
	console.log(uri);

	res.status(200).json({
		uri,
	});
}
