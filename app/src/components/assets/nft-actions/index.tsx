import React from 'react';
import { Segmented, Button, Select, Avatar } from 'antd';
import type { SelectProps } from 'antd';
import { deployedChains } from '~/utils';
import { chainInfo } from '~/utils';

import { BigNumber } from 'ethers';

import { FormInput } from '~/components/common';
import { env } from '~/env.mjs';

import type { SegmentedLabeledOption } from 'antd/es/segmented';

import { ThirdwebSDK } from '@thirdweb-dev/sdk';

import { useSigner, useAddress } from '@thirdweb-dev/react';
import { PORTALS_ABI } from '~/utils/abi';
import toast from 'react-hot-toast';

type NFTAction = 'transfer' | 'cross-chain-transfer' | 'burn';

interface Props {
	chain: string;
	tokenId: string;
}
const NFTActions = ({ chain, tokenId }: Props) => {
	const [action, setAction] = React.useState<NFTAction>('transfer');
	const signer = useSigner();

	const portalsAddress = chainInfo[chain as 'mumbai' | 'fuji'].portalsAddress;

	const sdk = ThirdwebSDK.fromSigner(signer!, chain, {
		clientId: env.NEXT_PUBLIC_TW_CLIENT_ID,
	});

	const actions: SegmentedLabeledOption[] = [
		{
			label: 'Transfer',
			value: 'transfer',
		},
		{
			label: 'Cross Chain Transfer',
			value: 'cross-chain-transfer',
		},
		{
			label: 'Burn',
			value: 'burn',
		},
	];
	return (
		<div className='flex flex-col gap-4 rounded-md border-[1px] border-[#D1D1D1] p-4'>
			<Segmented
				options={actions}
				size='large'
				onChange={(value) => setAction(value.toString() as NFTAction)}
				className='w-fit'
			/>
			{action === 'transfer' && (
				<Transfer
					chain={chain}
					tokenId={tokenId}
					portalAddress={portalsAddress}
					sdk={sdk}
				/>
			)}
			{action === 'cross-chain-transfer' && (
				<CrossChainTransfer
					chain={chain}
					tokenId={tokenId}
					portalAddress={portalsAddress}
					sdk={sdk}
				/>
			)}
			{action === 'burn' && (
				<Burn
					chain={chain}
					tokenId={tokenId}
					portalAddress={portalsAddress}
					sdk={sdk}
				/>
			)}
		</div>
	);
};

interface FunctionProps extends Props {
	portalAddress: string;
	sdk: ThirdwebSDK;
}

const Transfer = ({ tokenId, portalAddress, sdk }: FunctionProps) => {
	const address = useAddress();
	const [to, setTo] = React.useState<string>('');

	const transfer = async () => {
		try {
			if (to === '') return;
			const contract = await sdk.getContract(portalAddress, PORTALS_ABI);
			const tx = (await contract.call('transferFrom', [address, to, tokenId])) as {
				receipt: {
					transactionHash: string;
				};
			};
			const txHash = tx.receipt.transactionHash;
			console.log('Transaction Hash: ', txHash);
		} catch (error) {
			console.error(error);
			toast.error('Error while transferring NFT');
		}
	};

	return (
		<div className='flex flex-col gap-4'>
			<span className='text-2xl font-medium'>Transfer</span>
			<FormInput
				placeholder='To'
				className='max-w-xl'
				onChange={(e) => setTo(e.target.value)}
			/>
			<Button
				className='w-fit !bg-secondary'
				type='primary'
				size='large'
				// eslint-disable-next-line @typescript-eslint/no-misused-promises
				onClick={transfer}
			>
				Execute
			</Button>
		</div>
	);
};

const CrossChainTransfer = ({
	chain,
	tokenId,
	portalAddress,
	sdk,
}: FunctionProps) => {
	const [to, setTo] = React.useState<string>('');
	const [destinationChainId, setDestinationChainId] =
		React.useState<string>('43113');

	const handleChange = (value: string) => {
		setDestinationChainId(value);
	};

	const options: SelectProps['options'] = [
		...deployedChains.map((chain) => {
			const imageUrl = 'https://ipfs.io/ipfs/' + chain.icon.slice(7);
			return {
				label: (
					<div className='flex flex-row items-center gap-2'>
						<Avatar src={imageUrl} alt={chain.name} size={18} />
						<span className='text-[1rem] dark:text-[#ffffffd8]'>{chain.name}</span>
					</div>
				),
				value: String(chain.chainId),
			};
		}),
	];

	const crossChainTransfer = async () => {
		const sourceChainId = chain === 'mumbai' ? '80001' : '43113';
		if (destinationChainId === sourceChainId) {
			toast.error('You cannot cross-chain transfer to the same chain');
			return;
		}
		if (to == '') {
			toast.error('Please enter a valid address');
			return;
		}
		try {
			const contract = await sdk.getContract(portalAddress, PORTALS_ABI);
			const destinationChain = destinationChainId === '43113' ? 'fuji' : 'mumbai';
			const destinationChainSelector = chainInfo[destinationChain].chainSelector;
			const destinationChainRouter = chainInfo[destinationChain].routerAddress;
			const tx = (await contract.call('requestCrossChainTransfer', [
				parseInt(tokenId),
				BigNumber.from(destinationChainSelector),
				destinationChainRouter,
				'0',
				to,
			])) as {
				receipt: {
					transactionHash: string;
				};
			};
			const txHash = tx.receipt.transactionHash;
			console.log('Transaction Hash: ', txHash);
		} catch (error) {
			console.error(error);
			toast.error('Error while transferring NFT');
		}
	};

	return (
		<div className='flex flex-col gap-4'>
			<span className='text-2xl font-medium'>Cross Chain Transfer</span>
			<FormInput
				placeholder='To'
				className='max-w-xl'
				onChange={(e) => setTo(e.target.value)}
				value={to}
			/>
			<Select
				placeholder='Select Chain to Mint on'
				defaultValue='43113'
				onChange={handleChange}
				optionLabelProp='label'
				options={options}
				size='large'
				className='max-w-xl'
			/>
			<Button
				className='w-fit !bg-secondary'
				type='primary'
				size='large'
				// eslint-disable-next-line @typescript-eslint/no-misused-promises
				onClick={crossChainTransfer}
			>
				Execute
			</Button>
		</div>
	);
};

const Burn = ({ chain, tokenId, portalAddress, sdk }: FunctionProps) => {
	const burn = async () => {
		try {
			const contract = await sdk.getContract(portalAddress, PORTALS_ABI);
			const tx = (await contract.call('burn', [tokenId])) as {
				receipt: {
					transactionHash: string;
				};
			};
			const txHash = tx.receipt.transactionHash;
			console.log('Transaction Hash: ', txHash);
		} catch (error) {
			console.error(error);
			toast.error('Error while burning NFT');
		}
	};

	return (
		<div className='flex flex-col gap-4'>
			<span className='text-2xl font-medium'>Burn</span>
			<Button
				className='w-fit !bg-red-400'
				type='primary'
				size='large'
				// eslint-disable-next-line @typescript-eslint/no-misused-promises
				onClick={burn}
			>
				Execute
			</Button>
		</div>
	);
};

export default NFTActions;
