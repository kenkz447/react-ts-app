import { FormikProps } from 'formik';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { AntdDivider, FormInput, FormSubmit, FromBody } from '@/components';
import { loginPath } from '@/configs';
import { ResetPasswordRequestBody } from '@/restful';

export type ResetPasswordFormValues = ResetPasswordRequestBody;
export interface ResetPasswordFormOwnProps extends FormikProps<ResetPasswordFormValues> {

}

export function ResetPasswordForm(props: ResetPasswordFormOwnProps) {
    const {
        values,
        handleChange,
        handleBlur
    } = props;

    return (
        <FromBody formProps={props}>
            <FormInput
                name={nameof<ResetPasswordFormValues>(o => o.password)}
                type="password"
                prefix="adi-lock"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                size="large"
                placeholder="New password"
            />
            <FormInput
                name={nameof<ResetPasswordFormValues>(o => o.passwordConfirmation)}
                type="password"
                prefix="adi-lock"
                value={values.passwordConfirmation}
                onChange={handleChange}
                onBlur={handleBlur}
                size="large"
                placeholder="New password confirmation"
            />
            <FormSubmit
                formProps={props}
                className="w-100"
            >
                Reset password
            </FormSubmit>
        </FromBody>
    );
}