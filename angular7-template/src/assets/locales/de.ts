import { LocalizationValues } from '@app/core/services/localization/localization-values';

export const de: LocalizationValues = {
  shortDateFormat: 'dd.MM.yyyy',
  notFoundPageText: 'Die angeforderte Seite wurde nicht gefunden.',
  homePageText: name => `Hallo ${name}. Willkomen!`,
  usersPageText:
    'Dies ist eine Benutzerseite mit einem Beispiel von Repository Service.',
  signInButtonText: 'Anmelden',
  signOutButtonText: 'Abmelden',
  homeModuleLinkText: 'Zuhause',
  usersModuleLinkText: 'Benutzer',
  firstNameCaption: 'Vorname',
  lastNameCaption: 'Nachname'
};
