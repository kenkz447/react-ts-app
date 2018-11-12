import { FormikProps } from 'formik';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { AntdDivider, FormSubmit } from '@/components';
import { FormInput } from '@/components/formik/FormField';
import { FromBody } from '@/components/formik/FromBody';
import { loginPath } from '@/configs';

export interface ForgotPasswordFormValues {
    readonly email: string;
    readonly url: string;
}

export interface ForgotPasswordFormOwnProps extends FormikProps<ForgotPasswordFormValues> {

}

export function ForgotPasswordForm(props: ForgotPasswordFormOwnProps) {
    const {
        values,
        handleChange,
        handleBlur
    } = props;

    return (
        <FromBody formProps={props}>
            <FormInput
                name={nameof<ForgotPasswordFormValues>(o => o.email)}
                prefix="adi-mail"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                size="large"
                placeholder="Email"
            />
            <FormSubmit
                formProps={props}
                className="w-100"
            >
                Recovery password
            </FormSubmit>
            <AntdDivider dashed={true} />
            <Link to={loginPath} replace={true}>Login</Link>
        </FromBody>
    );
}