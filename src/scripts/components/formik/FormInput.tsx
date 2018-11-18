import { Form, Icon, Input } from 'antd';
import { FormItemProps } from 'antd/lib/form';
import FormItem from 'antd/lib/form/FormItem';
import { InputProps } from 'antd/lib/input';
import * as React from 'react';

interface FormFieldProps extends InputProps, FormItemProps {
    readonly useFieldWrapper?: boolean;
}

function FormInputComponent(props: FormFieldProps) {
    const { useFieldWrapper, label, required, help, prefix, validateStatus, ...rest } = props;

    const inputPrefix =
        (prefix && typeof prefix === 'string' && prefix.startsWith('adi')) ?
            <Icon type={prefix.replace('adi-', '')} /> :
            prefix;

    const input = <Input {...rest} prefix={inputPrefix} />;

    if (useFieldWrapper) {
        return (
            <FormItem
                label={label}
                required={required}
                help={help}
                validateStatus={validateStatus}
            >
                {input}
            </FormItem>
        );
    }

    return input;
}

FormInputComponent.defaultProps = {
    useFieldWrapper: true
} as FormFieldProps;

export const FormInput = React.memo(FormInputComponent);