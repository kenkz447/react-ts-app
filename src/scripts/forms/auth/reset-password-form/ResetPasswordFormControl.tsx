import { withContext } from 'react-context-service';

import { AntdModal } from '@/components';
import { loginPath } from '@/configs';
import { WithHistory } from '@/domain';
import { text } from '@/i18n';
import { authResources, formFactory, FormProps } from '@/restful';

import {
    ResetPasswordForm,
    ResetPasswordFormValues
} from './reset-password-form-control';

export const ResetPasswordFormControl = formFactory.create<FormProps<ResetPasswordFormValues>>({
    wrapper: withContext<WithHistory>('history'),
    component: ResetPasswordForm,
    resource: authResources.resetPassword,
    onSusscess: (value, props: WithHistory) => {
        AntdModal.success({
            title: text('Reset completed'),
            content: text('Please login with your new password!'),
            maskClosable: false,
            okText: text('To login page'),
            onOk: () => {
                props.history.replace(loginPath);
            }
        });
    }
});