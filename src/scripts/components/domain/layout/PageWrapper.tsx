import * as React from 'react';
import styled from 'styled-components';

const PageWrapperContent = styled.div`
    min-height: inherit;
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    padding: 0 30px;
`;

type PageWrapperProps = React.DOMAttributes<{}>;

export class PageWrapper extends React.Component<PageWrapperProps> {
    componentDidMount() {
        if (document.documentElement) {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        }
    }

    render() {
        return (
            <PageWrapperContent className="page">
                {this.props.children}
            </PageWrapperContent>
        );
    }
}