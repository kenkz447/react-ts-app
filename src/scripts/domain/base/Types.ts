import { WithContextProps } from 'react-context-service';
import { RouteComponentProps } from 'react-router';

import { AppCoreContext, PageProps } from '@/app';
import { Salon, User } from '@/restful';

import { AuthClient } from './authentication';

export interface DomainContext extends AppCoreContext<User> {
    readonly authClient: AuthClient<User>;
    readonly currentSalon?: Salon;
    readonly drawerVisibled?: boolean;
    readonly showPageLoading?: boolean;
}

export type WithAuthClient = Pick<DomainContext, 'authClient'>;
export type WithHistory = Pick<DomainContext, 'history'>;

export type WithDomainContext = WithContextProps<DomainContext>;

export interface DecodedJWT {
    readonly _id: string;
    readonly id: string;
    readonly exp: number;
}

export type AppPageProps<T = {}> =
    RouteComponentProps<T> &
    WithDomainContext &
    PageProps;