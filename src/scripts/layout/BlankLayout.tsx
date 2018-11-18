import { Layout } from 'antd';
import * as React from 'react';
import styled from 'styled-components';

const BlankLayoutWrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
`;

const BlankLayoutContent = styled.div`
    flex-grow: 1;
    position: relative;
`;

interface BlankLayoutProps {
}

export class BlankLayout extends React.Component<BlankLayoutProps> {
    render() {
        const { children } = this.props;

        return (
            <BlankLayoutWrapper>
                <Layout>
                    <Layout.Content className="display-flex">
                        <BlankLayoutContent>
                            {children}
                        </BlankLayoutContent>
                    </Layout.Content>
                    <Layout.Footer style={{ textAlign: 'center' }}>
                        {`Create with ❤️ by Kenkz447`}
                    </Layout.Footer>
                </Layout>
            </BlankLayoutWrapper>
        );
    }
}