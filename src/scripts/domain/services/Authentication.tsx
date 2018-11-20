import * as React from 'react';
import { withContext, WithContextProps } from 'react-context-service';

import { User } from '@/restful';

import { AuthClient, DomainContext } from '../base';

type AuthenticationOwnProps = {
    readonly authClient: AuthClient<User>;
};

type AuthenticationProps = WithContextProps<DomainContext> &
    Pick<DomainContext, 'history'> &
    AuthenticationOwnProps;

class Authentication extends React.PureComponent<AuthenticationProps> {
    constructor(props: AuthenticationProps) {
        super(props);

        const { setContext, authClient } = props;
        setContext({
            authClient: authClient
        });
    }

    async componentDidMount() {
        const { setContext, authClient, history } = this.props;

        try {
            const user = await authClient.getLoggedInUser();
            setContext({
                currentUser: user
            });
        } catch (error) {
            const isOnAuthPage = history.location.pathname.startsWith('/auth');
            if (isOnAuthPage) {
                return;
            }

            authClient.gotoLoginPage();
            throw error;
        }
    }

    public render() {
        return this.props.children;
    }
}

export default withContext<DomainContext, AuthenticationOwnProps>('history')(Authentication);