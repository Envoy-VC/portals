import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const body = req.body as { chainId: string; tokenId: string; uri: string };
	const destinationChainId = parseInt(body.chainId);
	const tokenId = parseInt(body.tokenId);
	const uri = body.uri;

	const response = await fetch(
		'https://portals-teal.vercel.app/api/update-acc',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				chainId: destinationChainId,
				tokenId: tokenId,
				uri: uri,
			}),
		}
	);

	const json = (await response.json()) as string;
	res.status(200).json(json);
}
