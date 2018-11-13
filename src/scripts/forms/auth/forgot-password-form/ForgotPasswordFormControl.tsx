import { authResources, formFactory, FormProps } from '@/restful';

import {
    ForgotPasswordForm,
    ForgotPasswordFormValues
} from './forgot-password-form-control';

type ForgotPasswordFormProps = FormProps<ForgotPasswordFormValues>;

export const ForgotPasswordFormControl = formFactory.create<ForgotPasswordFormProps>({
    component: ForgotPasswordForm,
    resource: authResources.resetPassword,
    onSusscess: () => null
});