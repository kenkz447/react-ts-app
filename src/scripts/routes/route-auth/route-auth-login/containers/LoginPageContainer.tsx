import { Card } from 'antd';
import * as React from 'react';

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
                <Card>
                    <React.Fragment>
                        <AuthCardHeader>Login</AuthCardHeader>
                        <AuthCardDescription>
                            React typescript app with Ant Design
                        </AuthCardDescription>
                        <LoginFormControl />
                    </React.Fragment>
                </Card>
            </AuthCard>
        );
    }
}