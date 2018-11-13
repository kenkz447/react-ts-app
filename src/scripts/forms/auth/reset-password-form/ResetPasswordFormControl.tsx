import { authResources, formFactory } from '@/restful';

import {
    ResetPasswordForm,
    ResetPasswordFormValues
} from './reset-password-form-control';

export const ResetPasswordFormControl = formFactory.create<ResetPasswordFormValues>({
    component: ResetPasswordForm,
    resource: authResources.resetPassword,
    onSusscess: (response) => null
});