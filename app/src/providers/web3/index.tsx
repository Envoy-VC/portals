import React from 'react';
import {
	ThirdwebProvider,
	metamaskWallet,
	walletConnect,
	coinbaseWallet,
	trustWallet,
	localWallet,
} from '@thirdweb-dev/react';
import { AvalancheFuji, Mumbai } from '@thirdweb-dev/chains';
import { useTheme } from 'next-themes';

// Metadata
import { dAppMetadata } from 'config';

import { env } from '~/env.mjs';

const { NEXT_PUBLIC_TW_CLIENT_ID, NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID } = env;

interface Props {
	children: React.ReactNode;
}

const Web3Provider = ({ children }: Props) => {
	const { theme } = useTheme();

	return (
		<ThirdwebProvider
			clientId={NEXT_PUBLIC_TW_CLIENT_ID}
			supportedChains={[AvalancheFuji, Mumbai]}
			dAppMeta={dAppMetadata}
			theme={theme && theme === 'dark' ? 'dark' : 'light'}
			supportedWallets={[
				metamaskWallet(),
				coinbaseWallet(),
				walletConnect({
					projectId: NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
				}),
				trustWallet({
					projectId: NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
				}),
				localWallet(),
			]}
		>
			{children}
		</ThirdwebProvider>
	);
};

export default Web3Provider;
