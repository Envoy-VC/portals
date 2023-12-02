import React from 'react';

import { TbLayoutList, TbStarFilled, TbCellSignal5 } from 'react-icons/tb';

import { PiLightningFill } from 'react-icons/pi';

import type { IconType } from 'react-icons';
import { Attribute } from '~/types';

interface HolderProps {
	Icon: IconType;
	title: React.ReactNode;
	children: React.ReactNode;
}

export const Holder = ({ title, Icon, children }: HolderProps) => {
	return (
		<div className='flex flex-col gap-4 rounded-[6px] border-[1px] border-gray-200 dark:border-[#374151]'>
			<div className='flex flex-row items-center gap-2 rounded-t-[6px] bg-gray-100 px-4 py-2 text-slate-700 dark:bg-[#121212] dark:text-gray-200'>
				<Icon className='text-lg' />
				<span className='text-lg font-medium'>{title}</span>
			</div>
			<div className='px-4 py-2'>{children}</div>
		</div>
	);
};

interface NFTTraitsProps {
	attributes: Attribute[];
}

const NFTTraits = ({ attributes }: NFTTraitsProps) => {
	const propertyAttributes = attributes.map(
		(attribute) =>
			attribute.display_type === undefined && typeof attribute.value === 'string'
	);

	const levelAttributes = attributes.map(
		(attribute) =>
			attribute.display_type === undefined && typeof attribute.value === 'number'
	);

	const boostAttributes = attributes.map(
		(attribute) => attribute.display_type === 'boost_number'
	);

	const statsAttributes = attributes.map(
		(attribute) => attribute.display_type === 'number'
	);
	return (
		<div className='flex flex-col gap-4'>
			{propertyAttributes.length > 0 && (
				<Holder Icon={TbLayoutList} title='Properties'>
					aaa
				</Holder>
			)}
			{levelAttributes.length > 0 && (
				<Holder Icon={TbStarFilled} title='Levels'>
					aaa
				</Holder>
			)}
			{boostAttributes.length > 0 && (
				<Holder Icon={PiLightningFill} title='Boost'>
					aaa
				</Holder>
			)}
			{statsAttributes.length > 0 && (
				<Holder Icon={TbCellSignal5} title='Stats'>
					aaa
				</Holder>
			)}
		</div>
	);
};

export default NFTTraits;
