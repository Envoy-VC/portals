import React from 'react';
import { Input, ConfigProvider } from 'antd';

import type { TextAreaProps } from 'antd/es/input';

interface Props extends TextAreaProps {
	prefixCls?: string;
}

const FormTextarea = ({ ...props }: Props) => {
	return (
		<ConfigProvider theme={{}}>
			<Input.TextArea {...props} />
		</ConfigProvider>
	);
};

export default FormTextarea;
