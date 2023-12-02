import React from 'react';
import type { UploadProps, UploadFile } from 'antd';
import { Upload } from 'antd';
import { useCreateNFTStore } from '~/stores';

import { PiUploadSimple } from 'react-icons/pi';
import clsx from 'clsx';

const { Dragger } = Upload;

const UploadContent = () => {
	const { setContent } = useCreateNFTStore();
	const [fileList, setFileList] = React.useState<UploadFile[]>([]);

	const props: UploadProps = {
		name: 'file',
		multiple: false,
		fileList,
		listType: 'picture',
		beforeUpload: (file) => {
			setFileList([file]);
			setContent(file);
			return false;
		},
		onRemove: () => {
			setFileList([]);
			setContent(null);
		},
		onDrop(e) {
			console.log('Dropped files', e.dataTransfer.files);
		},
	};

	return (
		<div className='flex flex-col gap-3 dark:text-gray-200'>
			<div className='text-2xl font-medium'>Upload Content</div>
			<div>Drag or choose your file to Upload</div>
			<Dragger
				{...props}
				prefixCls=''
				rootClassName={clsx(fileList.length && 'mb-24')}
			>
				<div className='group flex flex-col items-center justify-center gap-4 rounded-xl py-16'>
					<div>
						<PiUploadSimple className='text-[3rem]' />
					</div>
					<div className='max-w-xs whitespace-pre-wrap text-[1rem]'>
						PNG, TXT, ZIP, MP4,etc. (Supports all formats).
					</div>
				</div>
			</Dragger>
		</div>
	);
};

export default UploadContent;
