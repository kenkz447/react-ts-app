import { FormikProps } from 'formik';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { AntdDivider, FormInput, FormSubmit, FromBody } from '@/components';
import { forgotPasswordPath } from '@/configs';
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
                placeholder="username"
            />
            <FormInput
                type="password"
                name={nameof<LoginFormValues>(o => o.password)}
                prefix="adi-lock"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                size="large"
                placeholder="password"
            />
            <FormSubmit
                formProps={props}
                className="w-100"
            >
                Login
            </FormSubmit>
            <AntdDivider dashed={true} />
            <Link to={forgotPasswordPath} replace={true}>Forgot password?</Link>
        </FromBody>
    );
}