import * as React from 'react';
import styled from 'styled-components';

import { AntdCard } from '@/components';
import { LoginFormControl } from '@/forms';

const LoginPageWrapper = styled.div`
    width: 100%;
    max-width: 360px;
    margin: 0 auto;
`;

const LoginHeader = styled.h1`
    margin-bottom: 0;
    font-weight: bold;
`;

const LoginDescription = styled.p`
    font-size: 13px;
    color: rgba(0, 0, 0, 0.45);
`;

export class LoginPageContainer extends React.PureComponent {
    render() {
        return (
            <LoginPageWrapper>
                <AntdCard>
                    <React.Fragment>
                        <LoginHeader>Login</LoginHeader>
                        <LoginDescription>React typescript app with Ant Design</LoginDescription>
                        <LoginFormControl />
                    </React.Fragment>
                </AntdCard>
            </LoginPageWrapper>
        );
    }
}