import { Divider } from 'antd';
import { FormikProps } from 'formik';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { FormInput, FormSubmit, FromBody } from '@/components';
import { forgotPasswordPath } from '@/configs';
import { text } from '@/i18n';
import { LocalLoginRequestBody } from '@/restful';

export interface LoginFormValues extends LocalLoginRequestBody {

}

export interface LoginFormOwnProps extends FormikProps<LoginFormValues> {

}

export function LoginForm(props: LoginFormOwnProps) {
    const {
        values,
        handleChange,
        handleBlur
    } = props;

    return (
        <FromBody formProps={props}>
            <FormInput
                name={nameof<LoginFormValues>(o => o.identifier)}
                prefix="adi-user"
                value={values.identifier}
                onChange={handleChange}
                onBlur={handleBlur}
                size="large"
                placeholder={text('username')}
            />
            <FormInput
                type="password"
                name={nameof<LoginFormValues>(o => o.password)}
                prefix="adi-lock"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                size="large"
                placeholder={text('password')}
            />
            <FormSubmit
                formProps={props}
                className="w-100"
            >
                {text('Login')}
            </FormSubmit>
            <Divider dashed={true} />
            <Link
                to={forgotPasswordPath}
                replace={true}
            >
                {text('Forgot password')}?
            </Link>
        </FromBody>
    );
}