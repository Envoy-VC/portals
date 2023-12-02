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
	setName: (name: string) => void;
	setDescription: (description: string) => void;
	setContent: (content: File | null) => void;
	setChainId: (chainId: string) => void;
	addAttribute: (attribute: Attribute) => void;
	removeAttribute: (attribute: Attribute) => void;
	reset: () => void;
}

export const useCreateNFTStore = create<State & Actions>((set) => ({
	name: '',
	description: '',
	content: null,
	chainId: '43113',
	attributes: [],
	setName: (name: string) => set({ name }),
	setDescription: (description: string) => set({ description }),
	setContent: (content: File | null) => set({ content }),
	setChainId: (chainId: string) => set({ chainId }),
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
		set(() => ({
			name: '',
			chainId: '43113',
			description: '',
			content: null,
			attributes: [],
		}));
	},
}));
