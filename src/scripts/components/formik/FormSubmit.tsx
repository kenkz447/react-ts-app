import { FormikProps } from 'formik';
import * as React from 'react';

import { AntdButton, AntdButtonProps } from '../antd';

interface FormSubmitButtonProps {
    readonly formProps: FormikProps<{}>;
}

function FormSubmitButtonComponent(props: FormSubmitButtonProps & AntdButtonProps) {
    const { formProps, ...buttonProps } = props;
    return (
        <AntdButton
            loading={formProps.isSubmitting}
            htmlType="submit"
            type="primary"
            size="large"
            {...buttonProps}
        />
    );
}

export const FormSubmit = React.memo(FormSubmitButtonComponent);