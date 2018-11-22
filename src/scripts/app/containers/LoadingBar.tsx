import * as React from 'react';

import {
    fetchFail,
    FetchFailEvent,
    fetchStart,
    FetchStartEvent,
    fetchSuccess,
    FetchSuccessEvent
} from '@/restful';

type Mode = 'hibernate' | 'init' | 'active' | 'complete';

type LoadingBarProps = {
    readonly style?: React.CSSProperties;
};

type LoadingBarState = {
    readonly mode: Mode
};

let activeRequests = 0;

export class LoadingBar extends React.PureComponent<LoadingBarProps, LoadingBarState> {
    readonly state: LoadingBarState = {
        mode: 'hibernate'
    };

    componentDidMount() {
        window.addEventListener(fetchStart, (e: FetchStartEvent) => {
            const isGETRequest = this.isGETRequest(e);
            if (isGETRequest) {
                return;
            }

            activeRequests++;

            if (this.state.mode !== 'hibernate') {
                return;
            }

            this.setState({ mode: 'init' }, this.tick);
        });

        window.addEventListener(fetchSuccess, (e: FetchSuccessEvent) => {
            const isGETRequest = this.isGETRequest(e);

            if (isGETRequest) {
                return;
            }

            activeRequests--;
        });

        window.addEventListener(fetchFail, (e: FetchFailEvent) => {
            const isGETRequest = this.isGETRequest(e);

            if (isGETRequest) {
                return;
            }

            activeRequests--;
        });
    }

    readonly isGETRequest = (e: FetchStartEvent) => {
        return (e.detail.init && e.detail.init.method !== 'GET');
    }

    readonly tick = () => {
        const mode = this.state.mode;

        if (mode === 'complete') {
            setTimeout(
                () => {
                    this.setState({ mode: 'hibernate' });
                },
                500
            );
        } else if (mode === 'active') {
            if (activeRequests === 0) {
                setTimeout(
                    () => {
                        if (activeRequests === 0) {
                            this.moveToMode('complete');
                        } else {
                            this.tick();
                        }
                    },
                    100
                );
            } else {
                this.tickWithDelay();
            }
        } else {
            if (activeRequests > 0) {
                setTimeout(
                    () => {
                        if (activeRequests > 0) {
                            this.moveToMode('active');
                        } else {
                            this.setState({ mode: 'hibernate' });
                        }
                    },
                    100
                );
            } else {
                this.setState({ mode: 'hibernate' });
            }
        }
    }

    readonly moveToInit = () => {
        if (this.state.mode === 'hibernate') {
            this.moveToMode('init');
        }
    }

    readonly moveToMode = (mode: Mode) => {
        this.setState({ mode }, () => {
            this.tick();
        });
    }

    readonly tickWithDelay = () => {
        setTimeout(
            () => {
                this.tick();
            },
            50
        );
    }

    readonly getBarStyle = (): React.CSSProperties => {
        const mode = this.state.mode;

        const width = (mode === 'complete') ? 100 : ((mode === 'init') ? 0 : 80);
        const animationSpeed = (mode === 'complete') ? 0.4 : 15;
        const transition = (mode === 'init') ?
            '' :
            (mode === 'hibernate') ?
                `opacity .2s ease-in` : `width ${animationSpeed}s ease-in`;

        const opacity = (mode === 'hibernate') ? 0 : 1;

        return {
            position: 'fixed',
            top: '0',
            zIndex: 9000,
            backgroundColor: '#f0ad4e',
            height: '2px',
            transition,
            width: `${width}%`,
            opacity: opacity,
            ...this.props.style
        };
    }

    render() {
        return (
            <div style={this.getBarStyle()} />
        );
    }
}