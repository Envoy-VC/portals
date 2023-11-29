import React from 'react';
import type { SelectProps } from 'antd';
import { Select, Avatar } from 'antd';

import { deployedChains } from '~/utils';

const ChainSelect = () => {
	const handleChange = (value: string) => {
		console.log(`selected ${value}`);
	};

	const options: SelectProps['options'] = [
		...deployedChains.map((chain, index) => {
			const imageUrl = 'https://ipfs.io/ipfs/' + chain.icon.slice(7);
			return {
				label: (
					<div className='flex flex-row gap-2'>
						<Avatar src={imageUrl} alt={chain.name} size={24} />
						<span className='text-lg font-medium text-[#ffffffd8]'>{chain.name}</span>
					</div>
				),
				value: String(chain.chainId),
			};
		}),
	];

	return (
		<div className='flex flex-col gap-3 text-gray-200'>
			<div className='text-2xl font-medium'>Select Chain</div>
			<Select
				placeholder='Select Chain to Mint on'
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
