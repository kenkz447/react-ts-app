import * as React from 'react';
import styled from 'styled-components';

import { AntdCard } from '@/components';
import { ForgotPasswordFormControl } from '@/forms';

const ForgotPasswordWrapper = styled.div`
    width: 100%;
    max-width: 360px;
    margin: 0 auto;
`;

const ForgotPasswordHeader = styled.h1`
    margin-bottom: 0;
    font-weight: bold;
`;

const ForgotPasswordDescription = styled.p`
    font-size: 13px;
    color: rgba(0, 0, 0, 0.45);
`;

export class ForgotPasswordPageContainer extends React.PureComponent {
    render() {
        return (
            <ForgotPasswordWrapper>
                <AntdCard>
                    <React.Fragment>
                        <ForgotPasswordHeader>Forgot Password</ForgotPasswordHeader>
                        <ForgotPasswordDescription>React typescript app with Ant Design</ForgotPasswordDescription>
                        <ForgotPasswordFormControl />
                    </React.Fragment>
                </AntdCard>
            </ForgotPasswordWrapper>
        );
    }
}