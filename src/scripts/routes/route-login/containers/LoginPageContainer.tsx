import * as React from 'react';
import styled from 'styled-components';

import { LoginFormControl } from '@/forms/accounts';

const LoginPageWrapper = styled.div`
    width: 100%;
    max-width: 360px;
    padding: 15px;
    margin: 0 auto;
    text-align: center;
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
                <LoginHeader>Login</LoginHeader>
                <LoginDescription>React typescript app with Ant Design</LoginDescription>
                <LoginFormControl />
            </LoginPageWrapper>
        );
    }
}