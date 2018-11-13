import { routeFrom } from '@/app';

import { RouteAuthForgotPassword } from './route-auth-forgot-password';
import { RouteAuthLogin } from './route-auth-login';
import { RouteAuthResetPassword } from './route-auth-reset-password';

export default routeFrom([
    RouteAuthLogin,
    RouteAuthForgotPassword,
    RouteAuthResetPassword
]);