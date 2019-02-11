import { en, de } from './locales';

export enum Locale {
  EN = 'en',
  DE = 'de'
}

export const locales: { [id: string]: LocalizationValues } = {
  [Locale.EN]: en,
  [Locale.DE]: de
};

export class LocalizationSettings {
  defaultLocale: Locale = Locale.EN;
}

export abstract class LocalizationValues {
  abstract shortDateFormat: string;
  abstract notFoundPageText: string;
  abstract homePageText: (name: string) => string;
  abstract usersPageText: string;
  abstract userNameCaption: string;
  abstract passwordCaption: string;
  abstract invalidCredentialsError: string;
  abstract signInButtonText: string;
  abstract signOutButtonText: string;
  abstract homeModuleLinkText: string;
  abstract usersModuleLinkText: string;
  abstract firstNameCaption: string;
  abstract lastNameCaption: string;
}
