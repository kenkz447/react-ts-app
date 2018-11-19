import { Button, Form } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import { FormItemProps } from 'antd/lib/form';
import { FormikProps } from 'formik';
import * as React from 'react';

interface FormSubmitButtonProps {
    readonly formProps: FormikProps<{}>;
    readonly formItemProps?: FormItemProps;
}

function FormSubmitButtonComponent(props: FormSubmitButtonProps & ButtonProps) {
    const { formProps, formItemProps, ...buttonProps } = props;
    const button = (
        <Button
            loading={formProps.isSubmitting}
            htmlType="submit"
            type="primary"
            {...buttonProps}
        />
    );

    if (formItemProps) {
        return (
            <Form.Item {...formItemProps}>
                {button}
            </Form.Item>
        );
    }

    return button;
}

export const FormSubmit = React.memo<FormSubmitButtonProps & ButtonProps>(FormSubmitButtonComponent);