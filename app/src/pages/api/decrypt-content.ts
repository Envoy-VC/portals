import type { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
import * as LitJsSdk from '@lit-protocol/lit-node-client';
import type { UnifiedAccessControlConditions } from '@lit-protocol/types';
import { SiweMessage } from 'siwe';

import { env } from '~/env.mjs';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const body = req.body as {
		encryptedString: string;
		encryptedSymmetricKey: string;
		accessControlConditions: string;
		chainId: string;
	};
	const encryptedString = body.encryptedString;
	const encryptedSymmetricKey = body.encryptedSymmetricKey;
	const accessControlConditions = JSON.parse(
		body.accessControlConditions
	) as UnifiedAccessControlConditions;
	const chainId = parseInt(body.chainId);
	const chain = chainId === 80001 ? 'mumbai' : 'fuji';
	console.log('Chain during decryption is ', chain);

	// Connect to Lit Client
	const litNodeClient = new LitJsSdk.LitNodeClientNodeJs({
		alertWhenUnauthorized: false,
		litNetwork: 'serrano',
	});
	await litNodeClient.connect();

	// Obtain Wallets
	const wallet = new ethers.Wallet(env.PRIVATE_KEY);
	const address = await wallet.getAddress();

	// Get AuthSig
	const domain = 'localhost:3000';
	const origin = 'localhost:3000';
	const statement = 'Sign in to decrypt Content';
	const siweMessage = new SiweMessage({
		domain,
		address: address,
		statement,
		uri: origin,
		version: '1',
		chainId,
	});
	const messageToSign = siweMessage.prepareMessage();

	// Sign the message and format the authSig
	const signature = await wallet.signMessage(messageToSign);

	const authSig = {
		sig: signature,
		derivedVia: 'web3.eth.personal.sign',
		signedMessage: messageToSign,
		address: address,
	};

	const symmetricKey = await litNodeClient.getEncryptionKey({
		unifiedAccessControlConditions: accessControlConditions,
		toDecrypt: encryptedSymmetricKey,
		chain,
		authSig,
	});

	const decryptedString = await LitJsSdk.decryptString(
		LitJsSdk.base64StringToBlob(encryptedString),
		symmetricKey
	);

	res.status(200).json({
		decryptedString,
	});
}
