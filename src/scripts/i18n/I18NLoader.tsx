import * as React from 'react';
import { withContext, WithContextProps } from 'react-context-service';

import { AppCoreContext } from '../app/core';

// tslint:disable-next-line:interface-name
export interface I18NProps {
}

// tslint:disable-next-line:interface-name
interface I18NState {
    readonly currentLanguage: string;
    readonly needsUpdate?: boolean;
}

class I18NLoader extends React.PureComponent<WithContextProps<AppCoreContext, I18NProps>, I18NState> {
    static getDerivedStateFromProps(
        nextProps: WithContextProps<AppCoreContext, I18NProps>,
        state: I18NState
    ): I18NState | null {
        if (nextProps.currentLanguage !== state.currentLanguage) {
            return {
                currentLanguage: nextProps.currentLanguage!,
                needsUpdate: true
            };
        }
        return null;
    }

    constructor(props: WithContextProps<AppCoreContext, I18NProps>) {
        super(props);
        const { setContext } = props;

        this.state = {
            currentLanguage: 'en'
        };

        setContext({

        });
    }

    componentDidUpdate() {
        if (this.state.needsUpdate) {
            localStorage.setItem('lang', this.state.currentLanguage);
            
            this.setState({
                needsUpdate: false
            });
        }
    }

    public render() {
        if (this.state.needsUpdate) {
            return null;
        }

        return this.props.children;
    }
}

export default withContext<AppCoreContext, I18NProps>('currentLanguage')(I18NLoader);