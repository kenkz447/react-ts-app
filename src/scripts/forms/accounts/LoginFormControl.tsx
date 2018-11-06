import { Formik, FormikBag } from 'formik';
import * as React from 'react';
import { withContext, WithContextProps } from 'react-context-service';

import { DomainContext } from '@/domain';
import { tokenResources } from '@/restful';

import {
    LoginForm,
    LoginFormOwnProps,
    LoginFormValues
} from './login-form-control';

interface LoginFormControlOwnProps {

}

type LoginFormControlContextProps = Pick<DomainContext, 'authClient'>;
type LoginFormControlProps = WithContextProps<LoginFormControlContextProps, LoginFormControlOwnProps>;

class LoginFormControl extends React.PureComponent<LoginFormControlProps> {
    public render() {
        return (
            <Formik
                initialValues={{}}
                onSubmit={this.onSubmit}
            >
                {LoginForm}
            </Formik>
        );
    }

    readonly onSubmit = async (
        values: LoginFormValues,
        formiKBag: FormikBag<LoginFormOwnProps, LoginFormValues>
    ) => {
        const { authClient } = this.props;

        try {
            await authClient.login(tokenResources.create, values);
        } catch (error) {
            formiKBag.setStatus({
                error: 'Tài khoản hoặc mật khẩu không chính xác!'
            });
        } finally {
            formiKBag.setSubmitting(false);
        }
    }
}

export default withContext<DomainContext, LoginFormControlOwnProps>('authClient')(LoginFormControl);