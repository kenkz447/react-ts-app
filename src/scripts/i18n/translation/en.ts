export const en = {
    Login: 'Login',
    User: 'User',
    Profile: 'Profile',
    Meaning: 'Meaning',
    Example: 'Example',
    Source: 'Source'
};

export type TransationResource = Partial<{ readonly [K in keyof typeof en]: string }>;