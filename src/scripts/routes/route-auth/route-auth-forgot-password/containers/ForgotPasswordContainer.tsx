import { Card } from 'antd';
import * as React from 'react';

import { resetPasswordPath } from '@/configs';
import { ForgotPasswordFormControl } from '@/forms';
import {
    AuthCard,
    AuthCardDescription,
    AuthCardHeader
} from '@/routes/route-auth/shared';

export class ForgotPasswordPageContainer extends React.PureComponent {
    render() {
        return (
            <AuthCard>
                <Card>
                    <React.Fragment>
                        <AuthCardHeader>
                            Forgot Password
                        </AuthCardHeader>
                        <AuthCardDescription>
                            React typescript app with Ant Design
                        </AuthCardDescription>
                        <ForgotPasswordFormControl
                            initialValues={{
                                url: `${location.origin}${resetPasswordPath}`
                            }}
                        />
                    </React.Fragment>
                </Card>
            </AuthCard>
        );
    }
}