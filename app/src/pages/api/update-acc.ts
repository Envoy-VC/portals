import type { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const body = req.body as { chainId: string; tokenId: string };
	const chainId = parseInt(body.chainId);
	const tokenId = parseInt(body.tokenId);
	const abiCoder = ethers.utils.defaultAbiCoder;
	const encodedBytes = abiCoder.encode(
		['uint256', 'string'],
		[tokenId, 'https://metadata.degods.com/g/755.json']
	);
	res.status(200).json(encodedBytes);
}
