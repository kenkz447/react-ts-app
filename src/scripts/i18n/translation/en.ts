export const en = {
    Login: 'Login',
    User: 'User',
    Profile: 'Profile',
};

export type TransationResource = Partial<{ readonly [K in keyof typeof en]: string }>;