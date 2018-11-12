import * as React from 'react';
import styled from 'styled-components';

interface PageWrapperContentProps {
    readonly backgroundColor?: string;
}

const PageWrapperContent = styled.div`
    min-height: inherit;
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    padding: 0;
    background-color: ${(props: PageWrapperContentProps) => props.backgroundColor};
`;

interface PageWrapperProps extends PageWrapperContentProps {
    readonly className?: string;
}

export class PageWrapper extends React.Component<PageWrapperProps> {
    componentDidMount() {
        if (document.documentElement) {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        }
    }

    render() {
        const { backgroundColor, className } = this.props;
        return (
            <PageWrapperContent
                className={className}
                backgroundColor={backgroundColor}
            >
                {this.props.children}
            </PageWrapperContent>
        );
    }
}