import React from 'react';
import type { SelectProps } from 'antd';
import { Select, Avatar } from 'antd';
import { useCreateNFTStore } from '~/stores';

import { deployedChains } from '~/utils';

const ChainSelect = () => {
	const { chainId, setChainId } = useCreateNFTStore();

	const handleChange = (value: string) => {
		setChainId(value);
	};

	const options: SelectProps['options'] = [
		...deployedChains.map((chain) => {
			const imageUrl = 'https://ipfs.io/ipfs/' + chain.icon.slice(7);
			return {
				label: (
					<div className='flex flex-row gap-2'>
						<Avatar src={imageUrl} alt={chain.name} size={24} />
						<span className='text-lg font-medium dark:text-[#ffffffd8]'>
							{chain.name}
						</span>
					</div>
				),
				value: String(chain.chainId),
			};
		}),
	];

	return (
		<div className='flex flex-col gap-3 dark:text-gray-200'>
			<div className='text-2xl font-medium'>Select Chain</div>
			<Select
				placeholder='Select Chain to Mint on'
				value={chainId}
				defaultValue='43113'
				onChange={handleChange}
				optionLabelProp='label'
				options={options}
				size='large'
			/>
		</div>
	);
};

export default ChainSelect;
