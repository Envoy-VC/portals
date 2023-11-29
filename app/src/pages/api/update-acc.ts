import type { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const body = req.body as { chainId: string; tokenId: string };
		const chainId = parseInt(body.chainId);
		const tokenId = parseInt(body.tokenId);
		const abiCoder = ethers.utils.defaultAbiCoder;
		const encodedBytes = abiCoder.encode(
			['uint256', 'string'],
			[tokenId, 'newURI']
		);
		console.log(encodedBytes);
		res.status(200).json(encodedBytes);
	} else {
		res.status(405).send('Method Not Allowed');
	}
}
