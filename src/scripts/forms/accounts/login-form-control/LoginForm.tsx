import { FormikProps } from 'formik';
import * as React from 'react';

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
        touched,
        handleChange,
        handleBlur,
        isSubmitting
    } = props;

    return (
        <FromBody formProps={props}>
            <input
                name={nameof<LoginFormValues>(o => o.username)}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
            />
            {errors.username && touched.username && errors.username}
            <input
                type="password"
                name={nameof<LoginFormValues>(o => o.password)}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <button type="submit" disabled={isSubmitting}>
                Submit
            </button>
        </FromBody>
    );
}