import { ModalProps } from 'antd/lib/modal';
import { type } from 'os';
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
    readonly globalModal?: ModalProps & { readonly children?: React.ReactNode } | null;
}

export type WithCurrentUser = Pick<DomainContext, 'currentUser'>;
export type WithAuthClient = Pick<DomainContext, 'authClient'>;
export type WithHistory = Pick<DomainContext, 'history'>;
export type WithGlobalModal = Pick<DomainContext, 'globalModal'>;

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