import * as React from 'react';

import {
    AntdFormItem,
    AntdFormItemProps,
    AntdIcon,
    AntdInput,
    AntdInputProps
} from '../antd';

interface FormFieldProps extends AntdInputProps, AntdFormItemProps {
    readonly useFieldWrapper?: boolean;
}

function FormInputComponent(props: FormFieldProps) {
    const { useFieldWrapper, label, required, help, prefix, validateStatus, ...rest } = props;

    const inputPrefix =
        (prefix && typeof prefix === 'string' && prefix.startsWith('adi')) ?
            <AntdIcon type={prefix.replace('adi-', '')} /> :
            prefix;

    const input = <AntdInput {...rest} prefix={inputPrefix} />;

    if (useFieldWrapper) {
        return (
            <AntdFormItem
                label={label}
                required={required}
                help={help}
                validateStatus={validateStatus}
            >
                {input}
            </AntdFormItem>
        );
    }

    return input;
}

export const FormInput = React.memo(FormInputComponent);