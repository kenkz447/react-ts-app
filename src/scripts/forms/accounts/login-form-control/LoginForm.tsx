import { FormikProps } from 'formik';
import * as React from 'react';

import { FormSubmit } from '@/components';
import { FormInput } from '@/components/formik/FormField';
import { FromBody } from '@/components/formik/FromBody';
import { TokenRequestBody } from '@/restful';

export interface LoginFormValues extends TokenRequestBody {

}

export interface LoginFormOwnProps extends FormikProps<LoginFormValues> {

}

export function LoginForm(props: LoginFormOwnProps) {
    const {
        values,
        errors,
        handleChange,
        handleBlur
    } = props;

    return (
        <FromBody formProps={props}>
            <FormInput
                name={nameof<LoginFormValues>(o => o.username)}
                prefix="adi-user"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                size="large"
                placeholder="username"
                useFieldWrapper={true}
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
                useFieldWrapper={true}
            />
            <FormSubmit
                formProps={props}
                className="w-100"
            >
                Login
            </FormSubmit>
        </FromBody>
    );
}