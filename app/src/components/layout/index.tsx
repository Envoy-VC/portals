import React from 'react';
import {
	Web3Provider,
	AntDesignConfigProvider,
	NotificationProvider,
} from '~/providers';

import { ThemeProvider } from 'next-themes';
import { Navbar, SEO } from '~/components/common';

// Font
import { GeistSans } from 'geist/font/sans';
import clsx from 'clsx';

interface Props {
	children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
	return (
		<>
			<ThemeProvider attribute='class'>
				<SEO />
				<AntDesignConfigProvider>
					<Web3Provider>
						<NotificationProvider>
							<div className={clsx(GeistSans.className)}>
								<Navbar />
								{children}
							</div>
						</NotificationProvider>
					</Web3Provider>
				</AntDesignConfigProvider>
			</ThemeProvider>
		</>
	);
};

export default Layout;
