import { Formik, FormikBag } from 'formik';
import * as React from 'react';
import { WithContextProps } from 'react-context-service';

import { WithAuthClient } from '@/domain';
import { authResources, getErrorMessage, request } from '@/restful';

import {
    ForgotPasswordForm,
    ForgotPasswordFormOwnProps,
    ForgotPasswordFormValues
} from './forgot-password-form';

export class ForgotPasswordFormControl extends React.PureComponent {
    public render() {
        return (
            <Formik
                onSubmit={this.onSubmit}
                initialValues={{
                    url: `${location.origin}/reset-password`
                }}
            >
                {ForgotPasswordForm}
            </Formik>
        );
    }

    readonly onSubmit = async (
        values: ForgotPasswordFormValues,
        formiKBag: FormikBag<ForgotPasswordFormOwnProps, ForgotPasswordFormValues>
    ) => {
        try {
            await request(authResources.forgotPassword, {
                type: 'body',
                value: values
            });
        } catch (error) {
            formiKBag.setStatus({
                error: await getErrorMessage(error)
            });
        } finally {
            formiKBag.setSubmitting(false);
        }
    }
}