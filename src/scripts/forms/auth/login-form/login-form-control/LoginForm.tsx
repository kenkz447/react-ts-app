import { FormikProps } from 'formik';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { AntdDivider, FormSubmit } from '@/components';
import { FormInput } from '@/components/formik/FormField';
import { FromBody } from '@/components/formik/FromBody';
import { forgotPasswordPath } from '@/configs';
import { TokenRequestBody } from '@/restful';

export interface LoginFormValues extends TokenRequestBody {

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