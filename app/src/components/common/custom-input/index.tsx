import React from 'react';
import { Input, ConfigProvider } from 'antd';

import type { InputProps } from 'antd';

interface Props extends InputProps {
	prefixCls?: string;
}

const FormInput = ({ ...props }: Props) => {
	return (
		<ConfigProvider theme={{}}>
			<Input {...props} />
		</ConfigProvider>
	);
};

export default FormInput;
