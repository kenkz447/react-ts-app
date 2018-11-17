import { en, vi } from './translation';

const translationResources = {
    en,
    vi
};

export type AvaliableLanguage = keyof typeof translationResources;

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