import { en, vi } from './translation';

const translationResources = {
    en,
    vi
};

export type AvaliableLanguage = keyof typeof translationResources;

export const avaliableLanguages: {
    readonly name: AvaliableLanguage,
    readonly label: string,
    readonly symbol: string
}[] = [
    { name: 'en', label: 'English', symbol: '🇬🇧' },
    { name: 'vi', label: 'Vietnamese', symbol: '🇻🇳' }
];

export const text = (source) => {
    const lang = localStorage.getItem('lang');
    if (!lang) {
        return source;
    }

    if (translationResources[lang]) {
        return translationResources[lang][source] || source;
    }

    return source;
};