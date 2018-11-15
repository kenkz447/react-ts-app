import { FormikProps } from 'formik';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { AntdDivider, FormInput, FormSubmit, FromBody } from '@/components';
import { loginPath } from '@/configs';
import { text } from '@/i18n';
import { ForgotPasswordRequestBody } from '@/restful';

export type ForgotPasswordFormValues = ForgotPasswordRequestBody;
export type ForgotPasswordFormOwnProps = FormikProps<ForgotPasswordFormValues>;

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
                {text('Recovery password')}
            </FormSubmit>
            <AntdDivider dashed={true} />
            <Link to={loginPath} replace={true}>
                {text('Go to login page')}
            </Link>
        </FromBody>
    );
}