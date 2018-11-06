import { FormikProps } from 'formik';
import * as React from 'react';

import { FormikError } from './FormError';

interface FromBodyProps {
    // tslint:disable-next-line:no-any
    readonly children?: any;
    readonly formProps: FormikProps<{}>;
}

export function FromBody(props: FromBodyProps) {
    const {
        handleSubmit
    } = props.formProps;

    return (
        <form onSubmit={handleSubmit}>
            <FormikError formProps={props.formProps} />
            <div style={{ padding: '15px 0' }}>
                {props.children}
            </div>
        </form>
    );
}