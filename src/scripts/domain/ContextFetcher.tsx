import * as React from 'react';
import { withContext } from 'react-context-service';

import { DomainContext, WithDomainContext } from '@/domain';
import { request, salonResources } from '@/restful';

type ContextFetcherProps = WithDomainContext & Pick<DomainContext, 'currentUser'>;

class ContextFetcher extends React.PureComponent<ContextFetcherProps> {
    public componentDidUpdate() {
        const { currentUser } = this.props;

        if (!currentUser) {
            return;
        }

        this.fetchContext();
    }

    public render() {
        return this.props.children;
    }

    private readonly fetchContext = async () => {
        const { setContext, currentUser } = this.props;

        try {
            let salon = currentUser.salon;
            if (!salon) {
                salon = await request(
                    salonResources.getById,
                    {
                        type: 'path',
                        parameter: 'id',
                        value: currentUser.salonId
                    }
                );
            }

            setContext({
                currentSalon: salon,
                appState: 'READY'
            });
        } catch (error) {
            throw new Error('Problem encountered when fetch domain context!');
        }
    }
}

export default withContext<DomainContext>('currentUser')(ContextFetcher);