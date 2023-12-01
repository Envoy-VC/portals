import React from 'react';
import Image from 'next/image';
import { ConnectWallet, darkTheme } from '@thirdweb-dev/react';
import { useAddress } from '@thirdweb-dev/react';

// Icons
import { PortalsLogo } from '~/assets';
import Link from 'next/link';
import clsx from 'clsx';
import ThemeSwitcher from '../theme-switcher';
import { useTheme } from 'next-themes';

const Navbar = () => {
	const address = useAddress();
	const { theme } = useTheme();
	return (
		<div className='border-b-[1px] px-4 py-4 dark:border-[#2E2D32]'>
			<div className='mx-auto flex max-w-screen-2xl flex-row items-center justify-between gap-4'>
				<div className='flex flex-row items-center gap-2'>
					<Image src={PortalsLogo} alt='Portals Logo' width={38} height={38} />
					<span className='text-2xl font-semibold'>Portals</span>
				</div>
				<div className='hidden flex-row items-center gap-4 md:flex'>
					{NavbarItems.map((item, index) => (
						<Link
							key={index}
							href={item.href}
							passHref
							className='text-[1.1em] font-medium transition-all duration-200 ease-out hover:text-primary dark:text-gray-200'
						>
							{item.name}
						</Link>
					))}
				</div>
				<div className='flex flex-row items-center gap-2'>
					<ThemeSwitcher />

					<div
						className={clsx('', !address && 'border-[1px] border-white py-[2px]')}
					>
						<ConnectWallet
							btnTitle={'Connect'}
							modalTitle={'Login to Portals'}
							switchToActiveChain={true}
							modalSize={'wide'}
							welcomeScreen={{
								title: 'Share Content Cross-Chain with ease',
								subtitle: 'Connect to get Started',
							}}
							modalTitleIconUrl={''}
							className={clsx(theme === 'dark' ? '!bg-black !text-white' : '')}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

interface NavbarItem {
	name: string;
	href: string;
}

const NavbarItems: NavbarItem[] = [
	{
		name: 'Home',
		href: '/',
	},
	{
		name: 'Discover',
		href: '/discover',
	},
	{
		name: 'Create',
		href: '/create',
	},
	{
		name: 'FAQs',
		href: '#faqs',
	},
];

export default Navbar;
