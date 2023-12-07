import React from 'react';

import { TbLayoutList, TbStarFilled, TbCellSignal5 } from 'react-icons/tb';

import { PiLightningFill } from 'react-icons/pi';

import type { IconType } from 'react-icons';
import type { Attribute } from '~/types';

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
			<div className='flex flex-row flex-wrap items-center gap-2 px-4 py-2'>
				{children}
			</div>
		</div>
	);
};

interface NFTTraitsProps {
	attributes: Attribute[];
}

const NFTTraits = ({ attributes }: NFTTraitsProps) => {
	const propertyAttributes = attributes.map((attribute) => {
		if (
			attribute.display_type === undefined &&
			typeof attribute.value === 'string'
		)
			return attribute;
	});

	const levelAttributes = attributes.map((attribute) => {
		if (
			attribute.display_type === undefined &&
			typeof attribute.value === 'number'
		)
			return attribute;
	});

	const boostAttributes = attributes.map((attribute) => {
		if (attribute.display_type === 'boost_percentage') return attribute;
	});

	const statsAttributes = attributes.map((attribute) => {
		if (attribute.display_type === 'number') return attribute;
	});
	return (
		<div className='flex flex-col gap-4'>
			{propertyAttributes.length > 0 && (
				<Holder Icon={TbLayoutList} title='Properties'>
					{propertyAttributes.map((attribute, index) => {
						if (attribute) {
							return <AttributePill key={index} attribute={attribute} />;
						}
					})}
				</Holder>
			)}
			{levelAttributes.length > 0 && (
				<Holder Icon={TbStarFilled} title='Levels'>
					{levelAttributes.map((attribute, index) => {
						if (attribute) {
							return <AttributePill key={index} attribute={attribute} />;
						}
					})}
				</Holder>
			)}
			{boostAttributes.length > 0 && (
				<Holder Icon={PiLightningFill} title='Boost'>
					{boostAttributes.map((attribute, index) => {
						if (attribute) {
							return <AttributePill key={index} attribute={attribute} />;
						}
					})}
				</Holder>
			)}
			{statsAttributes.length > 0 && (
				<Holder Icon={TbCellSignal5} title='Stats'>
					{statsAttributes.map((attribute, index) => {
						if (attribute) {
							return <AttributePill key={index} attribute={attribute} />;
						}
					})}
				</Holder>
			)}
		</div>
	);
};

const AttributePill = ({ attribute }: { attribute: Attribute }) => {
	return (
		<div className='flex w-fit flex-col justify-center rounded-lg bg-gray-100 px-6 py-2 text-center dark:bg-[#131313]'>
			<span className='text-xl'>{attribute.trait_type}</span>
			<span className='text-[1rem] font-medium'>{attribute.value}</span>
		</div>
	);
};

export default NFTTraits;
