import type { NFTMetadata } from '~/types';

export const encrypt = async (
	chain: string,
	contractAddress: string,
	tokenId: string,
	content: string
) => {
	const res = await fetch('/api/encrypt-content', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			chain,
			contractAddress,
			tokenId,
			content,
		}),
	});
	const json = (await res.json()) as {
		encryptedString: string;
		encryptedSymmetricKey: string;
		accessControlConditions: string;
	};
	return json;
};

export const decrypt = async (
	encryptedString: string,
	encryptedSymmetricKey: string,
	accessControlConditions: string,
	chainId: string
) => {
	const res = await fetch('/api/decrypt-content', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			encryptedString,
			encryptedSymmetricKey,
			accessControlConditions,
			chainId,
		}),
	});
	const json = (await res.json()) as {
		decryptedString: string;
	};
	return json.decryptedString;
};

export const uploadToIpfs = async (content: string) => {
	const res = await fetch('/api/upload-to-ipfs', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			content,
		}),
	});
	const json = (await res.json()) as {
		uri: string;
	};
	return json.uri;
};

// ipfs://QmXFoSGnG7a9CwkvY6L2YfFe1c8JsECfe9EmoyUMBjdXfk

export const downloadFromIpfs = async (hash: string) => {
	const res = await fetch('/api/download-from-ipfs', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			hash,
		}),
	});
	const json = (await res.json()) as {
		data: NFTMetadata;
	};

	return json.data;
};
