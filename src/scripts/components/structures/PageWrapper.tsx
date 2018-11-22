import 'ant-design-pro/lib/PageHeader/style/css';

import { IPageHeaderProps } from 'ant-design-pro/lib/PageHeader';
import * as React from 'react';
import { Link } from 'react-router-dom';
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
    background-color: ${(props: PageWrapperContentProps) => props.backgroundColor};
    .antd-pro-page-header-pageHeader {
        padding: 16px 24px 0 24px;
    }
`;

type RenderBreacrumbItem = (item: { readonly title: React.ReactNode; readonly href?: string }) => React.ReactNode;

interface PageWrapperProps extends PageWrapperContentProps {
    readonly className?: string;
    readonly headerProps?: IPageHeaderProps & {
        readonly itemRender?: RenderBreacrumbItem;
    };
}

export class PageWrapper extends React.PureComponent<PageWrapperProps> {
    static readonly renderBreacrumbItem: RenderBreacrumbItem = (item) => {
        if (!item.href) {
            return <span>{item.title}</span>;
        }

        return <Link to={item.href}>{item.title}</Link>;
    }

    static readonly defaultProps = {
        backgroundColor: '#f0f2f5'
    };

    componentDidMount() {
        if (document.documentElement) {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        }
    }

    readonly getHeaderProps = () => {
        const { headerProps } = this.props;

        if (!headerProps) {
            return null;
        }

        if (headerProps.breadcrumbList) {
            return {
                itemRender: PageWrapper.renderBreacrumbItem,
                ...headerProps
            };
        }

        return headerProps;
    }

    render() {
        const { backgroundColor } = this.props;

        const headerProps = this.getHeaderProps();
        return (
            <PageWrapperContent
                backgroundColor={backgroundColor}
            >
                {headerProps && <PageHeader {...headerProps} />}
                {this.props.children}
            </PageWrapperContent>
        );
    }
}