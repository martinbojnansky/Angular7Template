import { en, de } from '@assets/locales';

export enum Locale {
  EN = 'en',
  DE = 'de'
}

export const locales = {
  [Locale.EN]: en,
  [Locale.DE]: de
};
