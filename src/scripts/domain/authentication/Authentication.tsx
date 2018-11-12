import * as React from 'react';
import { withContext, WithContextProps } from 'react-context-service';

import { User } from '@/restful';

import { DomainContext } from '../Types';
import { AuthClient } from './AuthClient';

type AuthenticationOwnProps = {
    readonly authClient: AuthClient<User>;
};

type AuthenticationProps = WithContextProps<DomainContext> &
    Pick<DomainContext, 'authClient'> &
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
        const { setContext, authClient } = this.props;

        try {
            const user = await authClient.getLoggedInUser();
            setContext({
                currentUser: user
            });
        } catch (error) {
            authClient.gotoLoginPage();
            throw error;
        }
    }

    public render() {
        return this.props.children;
    }
}

export default withContext<DomainContext, AuthenticationOwnProps>()(Authentication);