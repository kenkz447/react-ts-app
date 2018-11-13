import * as React from 'react';

import { AntdCard } from '@/components';
import { ResetPasswordFormControl } from '@/forms';
import {
    AuthCard,
    AuthCardDescription,
    AuthCardHeader
} from '@/routes/route-auth/shared';
import { getUrlSearchParam } from '@/utilities';

export class ResetPasswordPageContainer extends React.PureComponent {
    render() {
        const resetCode = getUrlSearchParam('code') as string;
        
        return (
            <AuthCard>
                <AntdCard>
                    <React.Fragment>
                        <AuthCardHeader>Reset password</AuthCardHeader>
                        <AuthCardDescription>
                            React typescript app with Ant Design
                        </AuthCardDescription>
                        <ResetPasswordFormControl
                            initialValues={{
                                code: resetCode
                            }}
                        />
                    </React.Fragment>
                </AntdCard>
            </AuthCard>
        );
    }
}