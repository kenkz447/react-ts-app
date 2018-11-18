import { Button } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import { FormikProps } from 'formik';
import * as React from 'react';

interface FormSubmitButtonProps {
    readonly formProps: FormikProps<{}>;
}

function FormSubmitButtonComponent(props: FormSubmitButtonProps & ButtonProps) {
    const { formProps, ...buttonProps } = props;
    return (
        <Button
            loading={formProps.isSubmitting}
            htmlType="submit"
            type="primary"
            size="large"
            {...buttonProps}
        />
    );
}

export const FormSubmit = React.memo<FormSubmitButtonProps & ButtonProps>(FormSubmitButtonComponent);