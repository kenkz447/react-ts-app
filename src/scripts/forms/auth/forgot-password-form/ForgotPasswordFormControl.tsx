import { withContext } from 'react-context-service';

import { AntdModal } from '@/components';
import { loginPath } from '@/configs';
import { WithHistory } from '@/domain';
import { text } from '@/i18n';
import { authResources, formFactory } from '@/restful';

import { ForgotPasswordForm } from './forgot-password-form-control';

export const ForgotPasswordFormControl = formFactory.create({
    wrapper: withContext<WithHistory>('history'),
    component: ForgotPasswordForm,
    resource: authResources.forgotPassword,
    onSusscess: (value, props: WithHistory) => {
        AntdModal.success({
            title: text('Reset password mail was sended!'),
            content: text('Please check your inbox(includes SPAM folder)!'),
            maskClosable: false,
            okText: text('To login page'),
            onOk: () => {
                props.history.replace(loginPath);
            }
        });
    }
});