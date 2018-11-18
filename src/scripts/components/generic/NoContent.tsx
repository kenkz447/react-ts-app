import * as React from 'react';
import styled from 'styled-components';

import { text } from '@/i18n';

const NoContentWrapper = styled.div`
    margin: 30px 0;
    text-align: center;
`;

interface NoContentProps {
    readonly children?: string;
}

export function NoContent(props: NoContentProps) {
    return (
        <NoContentWrapper>
            {text(props.children)}!
        </NoContentWrapper>
    );
}

NoContent.defaultProps = {
    children: 'No content found'
};