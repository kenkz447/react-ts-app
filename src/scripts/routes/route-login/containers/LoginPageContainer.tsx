import * as React from 'react';
import styled from 'styled-components';

import { LoginFormControl } from '@/forms/accounts';

const LoginPageWrapper = styled.div`
    width: 100%;
    padding: 15px;
`;

export class LoginPageContainer extends React.PureComponent {
    render() {
        return (
            <LoginPageWrapper>
                <h1>Đăng nhập</h1>
                <LoginFormControl />
            </LoginPageWrapper>
        );
    }
}