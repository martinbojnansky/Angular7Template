export abstract class LocalizationValues {
  abstract shortDateFormat: string;
  abstract notFoundPageText: string;
  abstract homePageText: (name: string) => string;
  abstract usersPageText: string;
  abstract signInButtonText: string;
  abstract signOutButtonText: string;
  abstract homeModuleLinkText: string;
  abstract usersModuleLinkText: string;
  abstract firstNameCaption: string;
  abstract lastNameCaption: string;
}
