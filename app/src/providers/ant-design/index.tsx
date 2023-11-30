import React from 'react';
import { ConfigProvider, theme } from 'antd';

import { useTheme } from 'next-themes';
import { useIsMounted } from 'usehooks-ts';
import clsx from 'clsx';

interface Props {
	children: React.ReactNode;
}

const AntDesignConfigProvider = ({ children }: Props) => {
	const { theme: defaultTheme } = useTheme();
	const [mounted, setMounted] = React.useState<boolean>(false);

	const isMounted = useIsMounted();

	React.useEffect(() => {
		if (isMounted()) {
			setMounted(true);
		}
	}, [isMounted]);

	return (
		<ConfigProvider
			theme={{
				algorithm:
					!!defaultTheme && defaultTheme === 'dark'
						? theme.darkAlgorithm
						: theme.defaultAlgorithm,
				token: {
					colorPrimary: '#0092A2',
				},
			}}
		>
			{mounted && (
				<div
					className={clsx(
						defaultTheme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'
					)}
				>
					{children}
				</div>
			)}
		</ConfigProvider>
	);
};

export default AntDesignConfigProvider;
