import * as React from 'react';

import { AntdCard } from '@/components';
import { LoginFormControl } from '@/forms';
import {
    AuthCard,
    AuthCardDescription,
    AuthCardHeader
} from '@/routes/route-auth/shared';

export class LoginPageContainer extends React.PureComponent {
    render() {
        return (
            <AuthCard>
                <AntdCard>
                    <React.Fragment>
                        <AuthCardHeader>Login</AuthCardHeader>
                        <AuthCardDescription>
                            React typescript app with Ant Design
                        </AuthCardDescription>
                        <LoginFormControl />
                    </React.Fragment>
                </AntdCard>
            </AuthCard>
        );
    }
}