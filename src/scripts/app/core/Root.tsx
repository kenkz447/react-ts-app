import * as React from 'react';
import { ContextCreator } from 'react-context-service';

import { AppCoreContext } from './';

export interface RootProps<Context extends AppCoreContext = AppCoreContext> {
    readonly AppContent: React.ComponentType;
    readonly initialContext: Partial<Context>;
}

export class Root extends React.Component<RootProps> {
    render() {
        const { AppContent, initialContext } = this.props;

        return (
            <ContextCreator value={initialContext}>
                <AppContent />
            </ContextCreator>
        );
    }
}