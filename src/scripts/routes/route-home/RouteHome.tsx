import { Card, Col, Row } from 'antd';
import * as React from 'react';

import { RouteInfo } from '@/app';
import { PageContent, PageWrapper } from '@/components';
import { DASHBOARD_URL } from '@/configs';
import { AppPageProps, RoutePage } from '@/domain';
import { isRoot } from '@/domain/policies';

type RouteHomeProps = AppPageProps;

export class RouteHome extends RoutePage<RouteHomeProps> {
    static readonly routeInfo: RouteInfo = {
        path: DASHBOARD_URL,
        title: 'Tổng quan',
        exact: true,
        policies: [isRoot]
    };

    render() {
        return (
            <PageWrapper>
                <PageContent>
                    <Row gutter={15}>
                        <Col span={24} md={6}>
                            <Card style={{ height: 200 }} />
                        </Col>
                        <Col span={24} md={6}>
                            <Card style={{ height: 200 }} />
                        </Col>
                        <Col span={24} md={6}>
                            <Card style={{ height: 200 }} />
                        </Col>
                        <Col span={24} md={6}>
                            <Card style={{ height: 200 }} />
                        </Col>
                    </Row>
                </PageContent>
            </PageWrapper>
        );
    }
}