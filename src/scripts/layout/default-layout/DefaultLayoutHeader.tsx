import { Icon } from 'antd';
import * as React from 'react';
import styled from 'styled-components';

const DefaultLayoutHeaderWrapper = styled.div`
    padding: 0 24px;
    display: flex;
    flex-grow: 1;
`;

export interface DefaultLayoutHeaderProps {
}

export function DefaultLayoutHeader(props: DefaultLayoutHeaderProps) {
    return (
        <DefaultLayoutHeaderWrapper>
            <div style={{ flexGrow: 1 }} />
            <div>
                <Icon type="global" />
            </div>
        </DefaultLayoutHeaderWrapper>
    );
}
