import { withContext, WithContextProps } from 'react-context-service';

import * as domainPolicies from './policies';
import { DomainContext } from './Types';

interface AccessControlProps {
    readonly policy: keyof typeof domainPolicies;
    readonly children: (result: boolean) => JSX.Element | null;
}

function AccessControl(props: AccessControlProps & WithContextProps<DomainContext>) {
    const { policy, children, getContext } = props;
    const appContext = getContext();
    const isAllowed = domainPolicies[policy](appContext);
    return children(isAllowed);
}

export default withContext<DomainContext, AccessControlProps>()(AccessControl);