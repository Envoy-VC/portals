import type { NextApiRequest, NextApiResponse } from 'next';
import { ethers } from 'ethers';
import * as LitJsSdk from '@lit-protocol/lit-node-client';
import type { ConditionType } from '@lit-protocol/types';
import { SiweMessage } from 'siwe';

import { env } from '~/env.mjs';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const body = req.body as {
		chain: string;
		contractAddress: string;
		tokenId: string;
		content: string;
	};
	const chainId = parseInt(body.chain);
	const contractAddress = body.contractAddress;
	const tokenId = parseInt(body.tokenId);
	const chain = chainId === 80001 ? 'mumbai' : 'fuji';
	const content = body.content;

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

	const unifiedAccessControlConditions = [
		{
			conditionType: 'evmBasic' as ConditionType,
			contractAddress: '',
			standardContractType: '',
			chain,
			method: '',
			parameters: [':userAddress'],
			returnValueTest: {
				comparator: '=',
				value: address,
			},
		},
		{ operator: 'or' },
		{
			conditionType: 'evmBasic' as ConditionType,
			contractAddress: contractAddress,
			standardContractType: 'ERC721',
			chain,
			method: 'ownerOf',
			parameters: [`${tokenId}`],
			returnValueTest: {
				comparator: '=',
				value: ':userAddress',
			},
		},
	];

	const { encryptedString, symmetricKey } =
		await LitJsSdk.encryptString(content);

	const encryptedSymmetricKey = await litNodeClient.saveEncryptionKey({
		unifiedAccessControlConditions,
		symmetricKey,
		authSig,
		chain,
		permanant: false,
	});

	const encryptedStr = await LitJsSdk.blobToBase64String(encryptedString);

	res.status(200).json({
		encryptedString: encryptedStr,
		encryptedSymmetricKey: LitJsSdk.uint8arrayToString(
			encryptedSymmetricKey,
			'base16'
		),
		accessControlConditions: JSON.stringify(unifiedAccessControlConditions),
	});
}
