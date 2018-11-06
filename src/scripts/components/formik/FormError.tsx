import { FormikProps } from 'formik';
import * as React from 'react';

import { AntdAlert } from '../antd';

interface FormikErrorProps {
    readonly formProps: FormikProps<{}>;
}

export function FormikError(props: FormikErrorProps) {
    if (!props.formProps.status || !props.formProps.status.error) {
        return null;
    }

    return (
        <AntdAlert type="error" message={props.formProps.status.error} closable={true} />
    );
}