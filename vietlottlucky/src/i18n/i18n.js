// @flow

import en from './locales/en';
import vi from './locales/vi';
import i18n from "i18n-js";

i18n.translations = { en, vi };

export const setI18nConfig = (lang: string) => {
  const fallback = 'en'
  const languageTag = ['en', 'vi'].includes(lang) ? lang : fallback

  i18n.locale = languageTag;
};

export default i18n;