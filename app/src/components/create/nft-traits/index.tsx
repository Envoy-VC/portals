import React from 'react';
import { Button } from 'antd';
import AttributeModal from '../attribute-modal';
import { useCreateNFTStore } from '~/stores';

import {
	TbLayoutList,
	TbCirclePlus,
	TbStarFilled,
	TbCellSignal5,
} from 'react-icons/tb';

import { PiLightningFill } from 'react-icons/pi';
import { HiOutlineTrash } from 'react-icons/hi';

import type { IconType } from 'react-icons';

export interface ModalInstance {
	state: boolean;
	type: 'properties' | 'levels' | 'stats' | 'boosts';
}

const NFTTraits = () => {
	const [modal, setModal] = React.useState<ModalInstance>({
		state: false,
		type: 'properties',
	});
	const { removeAttribute, attributes } = useCreateNFTStore();
	return (
		<div className='px-4'>
			<div className='flex w-full flex-col gap-2 rounded-2xl border-2 border-[#00B2F2] px-6 py-4'>
				<NFTTraitInput
					Icon={TbLayoutList}
					label='Properties'
					description='Textual traits that show up as rectangles'
					setModal={setModal}
				/>
				<div className='my-2 w-full border-[1px] border-gray-300' />
				<NFTTraitInput
					Icon={TbStarFilled}
					label='Levels'
					description='Numerical traits that just show as progress bar'
					setModal={setModal}
				/>
				<div className='my-2 w-full border-[1px] border-gray-300' />
				<NFTTraitInput
					Icon={TbCellSignal5}
					label='Stats'
					description='Numerical traits that just show as numbers'
					setModal={setModal}
				/>
				<div className='my-2 w-full border-[1px] border-gray-300' />
				<NFTTraitInput
					Icon={PiLightningFill}
					label='Boosts'
					description='Traits that show up as percentage'
					setModal={setModal}
				/>
			</div>
			{attributes.length > 0 && (
				<div className='my-5 flex w-full flex-col gap-2 rounded-2xl border-2 border-[#00B2F2] px-6 py-4'>
					{attributes.map((attribute, index) => {
						const { trait_type, value } = attribute;
						return (
							<div className='flex flex-col' key={index}>
								<div className='flex flex-row items-center justify-between gap-3'>
									<div className='flex flex-col gap-4 md:flex-row'>
										<span>
											<span className='font-medium'>Trait Type: </span>
											{trait_type}
										</span>
										<span>
											<span className='font-medium'>Value: </span>
											{value}
										</span>
									</div>
									<Button
										icon={<HiOutlineTrash className='text-red-400' />}
										type='text'
										onClick={() => {
											removeAttribute(attribute);
										}}
									/>
								</div>
								<div className='my-1 w-full border-[1px] border-gray-300' />
							</div>
						);
					})}
				</div>
			)}
			<AttributeModal state={modal} setModal={setModal} />
		</div>
	);
};

interface NFTTraitInputProps {
	Icon: IconType;
	label: string;
	description: string;
	setModal: React.Dispatch<React.SetStateAction<ModalInstance>>;
}
const NFTTraitInput = ({
	Icon,
	label,
	description,
	setModal,
}: NFTTraitInputProps) => {
	return (
		<div className='flex flex-row items-center justify-between '>
			<div className='flex flex-row items-start gap-2'>
				<Icon className='mt-1 text-xl text-slate-700 dark:text-gray-300' />
				<div className='flex flex-col'>
					<span className='font-medium text-slate-700 dark:text-gray-300'>
						{label}
					</span>
					<span className='text-sm text-gray-500 dark:text-gray-500'>
						{description}
					</span>
				</div>
			</div>
			<Button
				type='text'
				icon={
					<TbCirclePlus className='text-2xl text-slate-700 dark:text-gray-300' />
				}
				onClick={() => {
					setModal({
						state: true,
						type: label.toLowerCase() as 'properties' | 'levels' | 'stats' | 'boosts',
					});
				}}
			/>
		</div>
	);
};

export default NFTTraits;
