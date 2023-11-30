import React from 'react';
import { Input, ConfigProvider } from 'antd';

import type { InputProps } from 'antd';

interface Props extends InputProps {
	prefixCls?: string;
}

const FormInput = ({ ...props }: Props) => {
	return (
		<ConfigProvider
			theme={{
				token: {
					colorBgBase: '#00000',
					colorBgContainer: '#000',
				},
			}}
		>
			<Input {...props} />
		</ConfigProvider>
	);
};

export default FormInput;
