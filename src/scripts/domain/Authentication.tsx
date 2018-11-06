import * as React from 'react';
import { withContext, WithContextProps } from 'react-context-service';

import { DomainContext } from './Types';

type AuthenticationOwnProps = {

};

type AuthenticationProps = WithContextProps<DomainContext> &
    Pick<DomainContext, 'authClient'> &
    Pick<DomainContext, 'history'> &
    AuthenticationOwnProps;

class Authentication extends React.PureComponent<AuthenticationProps> {
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

export default withContext<DomainContext>('authClient')(Authentication);