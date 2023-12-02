import React from 'react';
import { Segmented, Button, Select, Avatar } from 'antd';
import type { SelectProps } from 'antd';
import { deployedChains } from '~/utils';

import { FormInput } from '~/components/common';

import type { SegmentedLabeledOption } from 'antd/es/segmented';

type NFTAction = 'transfer' | 'cross-chain-transfer' | 'burn';

const NFTActions = () => {
	const [action, setAction] = React.useState<NFTAction>('transfer');

	const actions: SegmentedLabeledOption[] = [
		{
			label: 'Transfer',
			value: 'transfer',
		},
		{
			label: 'Cross Chain Transfer',
			value: 'cross-chain-transfer',
		},
		{
			label: 'Burn',
			value: 'burn',
		},
	];
	return (
		<div className='flex flex-col gap-4 rounded-md border-[1px] border-[#D1D1D1] p-4'>
			<Segmented
				options={actions}
				size='large'
				onChange={(value) => setAction(value.toString() as NFTAction)}
				className='w-fit'
			/>
			{action === 'transfer' && <Transfer />}
			{action === 'cross-chain-transfer' && <CrossChainTransfer />}
			{action === 'burn' && <Burn />}
		</div>
	);
};

const Transfer = () => {
	return (
		<div className='flex flex-col gap-4'>
			<span className='text-2xl font-medium'>Transfer</span>
			<FormInput placeholder='To' className='max-w-xl' />
			<Button className='w-fit !bg-secondary' type='primary' size='large'>
				Execute
			</Button>
		</div>
	);
};

const CrossChainTransfer = () => {
	const handleChange = (value: string) => {
		console.log(`selected ${value}`);
	};

	const options: SelectProps['options'] = [
		...deployedChains.map((chain) => {
			const imageUrl = 'https://ipfs.io/ipfs/' + chain.icon.slice(7);
			return {
				label: (
					<div className='flex flex-row items-center gap-2'>
						<Avatar src={imageUrl} alt={chain.name} size={18} />
						<span className='text-[1rem] dark:text-[#ffffffd8]'>{chain.name}</span>
					</div>
				),
				value: String(chain.chainId),
			};
		}),
	];
	return (
		<div className='flex flex-col gap-4'>
			<span className='text-2xl font-medium'>Cross Chain Transfer</span>
			<FormInput placeholder='To' className='max-w-xl' />
			<Select
				placeholder='Select Chain to Mint on'
				defaultValue='43113'
				onChange={handleChange}
				optionLabelProp='label'
				options={options}
				size='large'
				className='max-w-xl'
			/>
			<Button className='w-fit !bg-secondary' type='primary' size='large'>
				Execute
			</Button>
		</div>
	);
};

const Burn = () => {
	return (
		<div className='flex flex-col gap-4'>
			<span className='text-2xl font-medium'>Burn</span>
			<Button className='w-fit !bg-red-400' type='primary' size='large'>
				Execute
			</Button>
		</div>
	);
};

export default NFTActions;
