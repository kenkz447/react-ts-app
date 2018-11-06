import { WithContextProps } from 'react-context-service';
import { RouteComponentProps } from 'react-router';

import { AppCoreContext, PageProps } from '@/app';
import { Salon, User } from '@/restful';

export interface DomainContext extends AppCoreContext<User> {
    readonly currentSalon?: Salon;
    readonly drawerVisibled?: boolean;
    readonly showPageLoading?: boolean;
}

export type WithDomainContext = WithContextProps<DomainContext>;

export interface DecodedJWT {
    readonly sub: number;
    readonly name: string;
    readonly email: string;
    readonly exp: number;
    readonly iss: string;
    readonly aud: string;
}

export type AppPageProps<T = {}> =
    RouteComponentProps<T> &
    WithDomainContext &
    PageProps;