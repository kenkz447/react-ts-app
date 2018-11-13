import * as React from 'react';

import { AntdCard } from '@/components';
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
                <AntdCard>
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
                </AntdCard>
            </AuthCard>
        );
    }
}