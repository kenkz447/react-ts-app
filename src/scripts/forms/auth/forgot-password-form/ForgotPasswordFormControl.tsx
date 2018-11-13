import { authResources, formFactory } from '@/restful';

import {
    ForgotPasswordForm,
    ForgotPasswordFormValues
} from './forgot-password-form-control';

export const ForgotPasswordFormControl = formFactory.create<ForgotPasswordFormValues>({
    component: ForgotPasswordForm,
    resource: authResources.resetPassword,
    onSusscess: () => null
});