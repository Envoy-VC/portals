import React from 'react';
import { Toaster } from 'react-hot-toast';

import clsx from 'clsx';

interface Props {
	children: React.ReactNode;
}

const NotificationProvider = ({ children }: Props) => {
	return (
		<>
			{children}
			<Toaster
				position='bottom-left'
				toastOptions={{
					className: clsx('!bg-[#333333] !text-white'),
				}}
			/>
		</>
	);
};

export default NotificationProvider;
