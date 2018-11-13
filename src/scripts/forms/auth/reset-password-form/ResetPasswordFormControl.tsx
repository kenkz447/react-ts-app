import { authResources, formFactory } from '@/restful';

import { ResetPasswordForm } from './reset-password-form-control';

export const ResetPasswordFormControl = formFactory.create({
    component: ResetPasswordForm,
    resource: authResources.resetPassword,
    onSusscess: (response) => null
});