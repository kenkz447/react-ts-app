import { withContext } from 'react-context-service';

import { WithAuthClient } from '@/domain';
import {
    authResources,
    formFactory,
    FormProps,
    LocalLoginResponseBody
} from '@/restful';

import { LoginForm } from './login-form-control';

export const LoginFormControl = formFactory.create({
    wrapper: withContext<WithAuthClient>('authClient'),
    component: LoginForm,
    resource: authResources.local,
    onSusscess: (response: LocalLoginResponseBody, ownProps: WithAuthClient) => {
        const { authClient } = ownProps;
        authClient.signIn(response);
    }
});