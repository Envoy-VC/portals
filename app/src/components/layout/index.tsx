import React from 'react';
import {
	Web3Provider,
	AntDesignConfigProvider,
	NotificationProvider,
} from '~/providers';

import clsx from 'clsx';
import { Navbar, SEO } from '~/components/common';

// Font
import { GeistSans } from 'geist/font/sans';

interface Props {
	children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
	return (
		<>
			<SEO />
			<AntDesignConfigProvider>
				<Web3Provider>
					<NotificationProvider>
						<div className={GeistSans.className}>
							<Navbar />
							{children}
						</div>
					</NotificationProvider>
				</Web3Provider>
			</AntDesignConfigProvider>
		</>
	);
};

export default Layout;
