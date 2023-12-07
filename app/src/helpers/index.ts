import type { AccessControlConditions } from '@lit-protocol/types';
import type { Attribute, NFTMetadata } from '~/types';
import { chainInfo } from '~/utils';

const BASE_PATH = 'http://localhost:3000';

export const encrypt = async (
	chain: string,
	contractAddress: string,
	tokenId: string,
	content: string
) => {
	const res = await fetch(`${BASE_PATH}/api/encrypt-content`, {
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
	const res = await fetch(`${BASE_PATH}/api/decrypt-content`, {
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
	const res = await fetch(`${BASE_PATH}/api/upload-to-ipfs`, {
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
	const res = await fetch(`${BASE_PATH}/api/download-from-ipfs`, {
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

interface BuildMetadataProps {
	name: string;
	description: string;
	image: string;
	attributes: Attribute[];
	contentHash: string;
	chainId: string;
	tokenId: string;
}
export const buildMetadata = async ({
	name,
	description,
	image,
	attributes,
	contentHash,
	chainId,
	tokenId,
}: BuildMetadataProps) => {
	const chain = parseInt(chainId) === 80001 ? 'mumbai' : 'fuji';
	const portalsAddress = chainInfo[chain].portalsAddress;
	const { encryptedString, encryptedSymmetricKey, accessControlConditions } =
		await encrypt(chainId, portalsAddress, tokenId, contentHash);

	const metadata: NFTMetadata = {
		name,
		description,
		image,
		attributes,
		content: {
			encryptedString,
			encryptedSymmetricKey,
			accessControlConditions: JSON.parse(
				accessControlConditions
			) as AccessControlConditions,
		},
	};

	// Upload Metadata to IPFS
	const uri = await uploadToIpfs(JSON.stringify(metadata));

	return uri;
};

interface MintNFTProps {
	chainId: string;
	address: string;
	uri: string;
}

export const mintNFT = async ({ chainId, address, uri }: MintNFTProps) => {
	const res = await fetch(`${BASE_PATH}/api/mint-nft`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			chainId,
			address,
			uri,
		}),
	});
	const json = (await res.json()) as {
		txHash: string;
	};

	return json.txHash;
};

export const getNextTokenId = async ({ chainId }: { chainId: string }) => {
	const res = await fetch(`${BASE_PATH}/api/get-token-id`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			chainId,
		}),
	});
	const json = (await res.json()) as {
		nextTokenId: string;
	};

	return json.nextTokenId;
};

interface CallFunctionProps {
	chainId: string;
	contract: 'portals' | 'router';
	functionName: string;
	args: (string | number)[];
}
export const callContractFunction = async ({
	chainId,
	contract,
	functionName,
	args,
}: CallFunctionProps) => {
	const res = await fetch(`${BASE_PATH}/api/call-contract-function`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			chainId,
			contract,
			functionName,
			args,
		}),
	});
	const json = (await res.json()) as {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		data: any;
	};

	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return json.data;
};

export const testUpdate = async () => {
	const res = await fetch('/api/update-acc', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			chainId: '80001',
			tokenId: '0',
			uri: 'ipfs://QmQgwdtTzDJnbRbGyVDTEM1UtGhKaYLGDVE9N5eGrJbtca',
		}),
	});

	const json = (await res.json()) as string;
	return json;
};
