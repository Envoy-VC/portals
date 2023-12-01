import React from 'react';
import { Button } from 'antd';

import {
	TbLayoutList,
	TbCirclePlus,
	TbStarFilled,
	TbCellSignal5,
	TbCalendar,
} from 'react-icons/tb';

import type { IconType } from 'react-icons';

const NFTTraits = () => {
	return (
		<div className='px-4'>
			<div className='flex w-full flex-col gap-2 rounded-2xl border-2 border-[#00B2F2] px-6 py-4'>
				<NFTTraitInput
					Icon={TbLayoutList}
					label='Properties'
					description='Textual traits that show up as rectangles'
				/>
				<div className='my-2 w-full border-[1px] border-gray-300' />
				<NFTTraitInput
					Icon={TbStarFilled}
					label='Levels'
					description='Numerical traits that just show as progress bar'
				/>
				<div className='my-2 w-full border-[1px] border-gray-300' />
				<NFTTraitInput
					Icon={TbCellSignal5}
					label='Stats'
					description='Numerical traits that just show as numbers'
				/>
				<div className='my-2 w-full border-[1px] border-gray-300' />
				<NFTTraitInput
					Icon={TbCalendar}
					label='Dates'
					description='Traits that show up as date'
				/>
			</div>
		</div>
	);
};

interface NFTTraitInputProps {
	Icon: IconType;
	label: string;
	description: string;
	onClick?: () => void;
}
const NFTTraitInput = ({ Icon, label, description }: NFTTraitInputProps) => {
	return (
		<div className='flex flex-row items-center justify-between '>
			<div className='flex flex-row items-start gap-2'>
				<Icon className='mt-1 text-xl text-slate-700' />
				<div className='flex flex-col'>
					<span className='font-medium text-slate-700'>{label}</span>
					<span className='text-sm text-gray-500'>{description}</span>
				</div>
			</div>
			<Button
				type='text'
				icon={<TbCirclePlus className='text-2xl text-slate-700' />}
			/>
		</div>
	);
};

export default NFTTraits;
