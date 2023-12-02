import React from 'react';

import {
	TbLayoutList,
	TbStarFilled,
	TbCellSignal5,
	TbCalendar,
} from 'react-icons/tb';
import type { IconType } from 'react-icons';

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

const NFTTraits = () => {
	return (
		<div className='flex flex-col gap-4'>
			<Holder Icon={TbLayoutList} title='Properties'>
				aaa
			</Holder>
			<Holder Icon={TbStarFilled} title='Levels'>
				aaa
			</Holder>
			<Holder Icon={TbCellSignal5} title='Stats'>
				aaa
			</Holder>
			<Holder Icon={TbCalendar} title='Dates'>
				aaa
			</Holder>
		</div>
	);
};

export default NFTTraits;
