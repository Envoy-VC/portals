import React from 'react';
import { Modal, Button, InputNumber } from 'antd';
import { FormInput } from '~/components/common';

import { useCreateNFTStore } from '~/stores';

import type { ModalInstance } from '../nft-traits';

interface Props {
	state: ModalInstance;
	setModal: React.Dispatch<React.SetStateAction<ModalInstance>>;
}

const AttributeModal = ({ state, setModal }: Props) => {
	return (
		<Modal
			destroyOnClose
			open={state.state}
			title='Add Trait'
			onCancel={() => {
				setModal({
					...state,
					state: false,
				});
			}}
			footer={null}
		>
			{state.type === 'properties' && (
				<AddProperty setModal={setModal} state={state} />
			)}
			{state.type === 'levels' && <AddLevel setModal={setModal} state={state} />}
			{state.type === 'stats' && <AddStat setModal={setModal} state={state} />}
			{state.type === 'boosts' && <AddBoost setModal={setModal} state={state} />}
		</Modal>
	);
};

const AddProperty = ({ setModal }: Props) => {
	const { addAttribute } = useCreateNFTStore();
	const [name, setName] = React.useState<string>('');
	const [value, setValue] = React.useState<string>('');
	return (
		<div className='flex flex-col gap-2'>
			<FormInput
				placeholder='Trait Name'
				onChange={(e) => {
					setName(e.target.value);
				}}
			/>
			<FormInput
				placeholder='Trait Value'
				onChange={(e) => {
					setValue(e.target.value);
				}}
			/>
			<div className='flex w-full justify-end pt-8'>
				<Button
					type='primary'
					className='bg-secondary'
					onClick={() => {
						if (!name) return;
						if (!value) return;
						addAttribute({
							trait_type: name,
							value: value,
						});
						setName('');
						setValue('');
						setModal({
							state: false,
							type: 'properties',
						});
					}}
				>
					Add
				</Button>
			</div>
		</div>
	);
};

const AddLevel = ({ setModal }: Props) => {
	const { addAttribute } = useCreateNFTStore();
	const [name, setName] = React.useState<string>('');
	const [value, setValue] = React.useState<string>('');
	return (
		<div className='flex flex-col gap-2'>
			<FormInput
				placeholder='Trait Name'
				onChange={(e) => {
					setName(e.target.value);
				}}
			/>
			<InputNumber
				placeholder='Trait Value'
				className='w-full'
				onChange={(e) => {
					setValue(e?.toString() ?? '');
				}}
			/>
			<div className='flex w-full justify-end pt-8'>
				<Button
					type='primary'
					className='bg-secondary'
					onClick={() => {
						if (!name) return;
						if (!value) return;
						if (value === '') return;
						addAttribute({
							trait_type: name,
							value: parseInt(value),
						});
						setName('');
						setValue('');
						setModal({
							state: false,
							type: 'properties',
						});
					}}
				>
					Add
				</Button>
			</div>
		</div>
	);
};

const AddStat = ({ setModal }: Props) => {
	const { addAttribute } = useCreateNFTStore();
	const [name, setName] = React.useState<string>('');
	const [value, setValue] = React.useState<string>('');
	return (
		<div className='flex flex-col gap-2'>
			<FormInput
				placeholder='Trait Name'
				onChange={(e) => {
					setName(e.target.value);
				}}
			/>
			<InputNumber
				placeholder='Trait Value'
				className='w-full'
				onChange={(e) => {
					setValue(e?.toString() ?? '');
				}}
			/>
			<div className='flex w-full justify-end pt-8'>
				<Button
					type='primary'
					className='bg-secondary'
					onClick={() => {
						if (!name) return;
						if (!value) return;
						if (value === '') return;
						addAttribute({
							display_type: 'number',
							trait_type: name,
							value: parseInt(value),
						});
						setName('');
						setValue('');
						setModal({
							state: false,
							type: 'properties',
						});
					}}
				>
					Add
				</Button>
			</div>
		</div>
	);
};

const AddBoost = ({ setModal }: Props) => {
	const { addAttribute } = useCreateNFTStore();
	const [name, setName] = React.useState<string>('');
	const [value, setValue] = React.useState<string>('');
	return (
		<div className='flex flex-col gap-2'>
			<FormInput
				placeholder='Trait Name'
				onChange={(e) => {
					setName(e.target.value);
				}}
			/>
			<InputNumber
				placeholder='Trait Value'
				className='w-full'
				onChange={(e) => {
					setValue(e?.toString() ?? '');
				}}
			/>
			<div className='flex w-full justify-end pt-8'>
				<Button
					type='primary'
					className='bg-secondary'
					onClick={() => {
						if (!name) return;
						if (!value) return;
						if (value === '') return;
						addAttribute({
							display_type: 'boost_percentage',
							trait_type: name,
							value: parseInt(value),
						});
						setName('');
						setValue('');
						setModal({
							state: false,
							type: 'properties',
						});
					}}
				>
					Add
				</Button>
			</div>
		</div>
	);
};

export default AttributeModal;
