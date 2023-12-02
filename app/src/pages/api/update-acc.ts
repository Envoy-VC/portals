import type { NextApiRequest, NextApiResponse } from 'next';
import type {
	AccsEVMParams,
	UnifiedAccessControlConditions,
} from '@lit-protocol/types';
import { chainInfo } from '~/utils';
import { ethers } from 'ethers';

import { uploadToIpfs, downloadFromIpfs, decrypt, encrypt } from '~/helpers';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const body = req.body as { chainId: string; tokenId: string; uri: string };
	const destinationChainId = parseInt(body.chainId);
	const destinationChain = destinationChainId === 80001 ? 'mumbai' : 'fuji';
	const tokenId = parseInt(body.tokenId);
	const uri = body.uri;
	const contractAddress = chainInfo[destinationChain].portalsAddress;

	// obtain URI in JSON format
	const jsonURI = await downloadFromIpfs(uri);
	const {
		content: { encryptedString, encryptedSymmetricKey, accessControlConditions },
	} = jsonURI;
	const chain = (accessControlConditions?.at(0) as AccsEVMParams)?.chain;
	console.log('Chain is ', chain);
	const chainId = chain === 'mumbai' ? 80001 : 43113;

	// decrypt content
	const content = await decrypt(
		encryptedString,
		encryptedSymmetricKey,
		JSON.stringify(accessControlConditions),
		String(chainId)
	);

	// Encrypt with new ACCs
	const {
		encryptedString: newEncryptedString,
		encryptedSymmetricKey: newEncryptedSymmetricKey,
		accessControlConditions: newAccessControlConditions,
	} = await encrypt(
		String(destinationChainId),
		contractAddress,
		String(tokenId),
		content
	);

	const updatedURI = {
		...jsonURI,
		content: {
			...jsonURI.content,
			encryptedString: newEncryptedString,
			encryptedSymmetricKey: newEncryptedSymmetricKey,
			accessControlConditions: JSON.parse(
				newAccessControlConditions
			) as UnifiedAccessControlConditions,
		},
	};

	// upload new URI to IPFS
	const newURI = await uploadToIpfs(JSON.stringify(updatedURI));

	const abiCoder = ethers.utils.defaultAbiCoder;
	const encodedBytes = abiCoder.encode(['uint256', 'string'], [tokenId, newURI]);

	res.status(200).json(encodedBytes);
}
