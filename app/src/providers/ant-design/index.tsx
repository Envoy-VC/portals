import React from 'react';
import { ConfigProvider, theme } from 'antd';

interface Props {
	children: React.ReactNode;
}

const AntDesignConfigProvider = ({ children }: Props) => {
	return (
		<ConfigProvider
			theme={{
				algorithm: theme.darkAlgorithm,
				token: {
					colorPrimary: '#0092A2',
				},
			}}
		>
			{children}
		</ConfigProvider>
	);
};

export default AntDesignConfigProvider;
