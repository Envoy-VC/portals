import type { UnifiedAccessControlConditions } from '@lit-protocol/types';

export interface NFTMetadata {
	name: string;
	description: string;
	image: string;
	external_url?: string;
	animation_url?: string;
	attributes: Attribute[];
	content: {
		encryptedString: string;
		encryptedSymmetricKey: string;
		accessControlConditions: UnifiedAccessControlConditions;
	};
}

export interface Attribute {
	display_type?: string;
	trait_type: string;
	value: string | number;
}
