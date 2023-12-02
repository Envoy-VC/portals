import { create } from 'zustand';
import type { Attribute } from '~/types';

interface State {
	name: string;
	description: string;
	content: File | null;
	chainId: string;
	attributes: Attribute[];
}

interface Actions {
	addAttribute: (attribute: Attribute) => void;
	removeAttribute: (attribute: Attribute) => void;
	reset: () => void;
}

export const useCreateNFTStore = create<State & Actions>((set) => ({
	name: '',
	description: '',
	content: null,
	chainId: '80001',
	attributes: [],
	addAttribute: (attribute: Attribute) => {
		set((state) => ({
			...state,
			attributes: [...state.attributes, attribute],
		}));
	},
	removeAttribute: (attribute: Attribute) => {
		set((state) => ({
			...state,
			attributes: state.attributes.filter(
				(a) => a.trait_type !== attribute.trait_type
			),
		}));
	},
	reset: () => {
		set((state) => ({
			...state,
			name: '',
			description: '',
			content: null,
			attributes: [],
		}));
	},
}));
