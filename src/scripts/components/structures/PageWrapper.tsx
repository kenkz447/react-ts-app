import 'ant-design-pro/lib/PageHeader/style/css';

import { IPageHeaderProps } from 'ant-design-pro/lib/PageHeader';
import * as React from 'react';
import styled from 'styled-components';

const PageHeader = require('ant-design-pro/lib/PageHeader');

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
    background-color: ${(props: PageWrapperContentProps) => props.backgroundColor};
    .antd-pro-page-header-pageHeader {
        padding: 16px 24px 0 24px;
    }
`;

interface PageWrapperProps extends PageWrapperContentProps {
    readonly className?: string;
    readonly headerProps?: IPageHeaderProps & {
        readonly itemRender: (item: { readonly title: React.ReactNode; readonly href?: string }) => React.ReactNode;
    };
}

export class PageWrapper extends React.Component<PageWrapperProps> {
    componentDidMount() {
        if (document.documentElement) {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        }
    }

    render() {
        const { backgroundColor, className, headerProps } = this.props;
        return (
            <PageWrapperContent
                className={className}
                backgroundColor={backgroundColor}
            >
                {headerProps && <PageHeader {...headerProps} />}
                {this.props.children}
            </PageWrapperContent>
        );
    }
}