import { FormikProps } from 'formik';
import * as React from 'react';

import { FormInput, FormSubmit, FromBody } from '@/components';
import { text } from '@/i18n';
import { ResetPasswordRequestBody } from '@/restful';

export type ResetPasswordFormValues = ResetPasswordRequestBody;
export type ResetPasswordFormOwnProps = FormikProps<ResetPasswordFormValues>;

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
                placeholder={text('New password')}
            />
            <FormInput
                name={nameof<ResetPasswordFormValues>(o => o.passwordConfirmation)}
                type="password"
                prefix="adi-lock"
                value={values.passwordConfirmation}
                onChange={handleChange}
                onBlur={handleBlur}
                size="large"
                placeholder={text('New password confirmation')}
            />
            <FormSubmit
                formProps={props}
                className="w-100"
            >
                {text('Reset password')}
            </FormSubmit>
        </FromBody>
    );
}