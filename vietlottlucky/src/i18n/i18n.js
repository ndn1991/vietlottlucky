// @flow

import I18n, { getLanguages } from 'react-native-i18n';
import en from './locales/en';
import vi from './locales/vi';

I18n.fallbacks = true;
I18n.translations = {
  en,
  vi
};
I18n.defaultLocale = 'en';

getLanguages().then(languages => {
  if (languages && languages.length > 0) {
    I18n.locale = languages[0];
  }
})

export default I18n;