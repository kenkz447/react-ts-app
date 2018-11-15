import * as React from 'react';

import { AntdCard } from '@/components';
import { ResetPasswordFormControl } from '@/forms';
import { text } from '@/i18n';
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
                        <AuthCardHeader>{text('Reset password')}</AuthCardHeader>
                        <AuthCardDescription>
                            {text('React typescript app with Ant Design')}
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