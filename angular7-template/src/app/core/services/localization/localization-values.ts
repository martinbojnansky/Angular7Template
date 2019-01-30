export abstract class LocalizationValues {
  abstract welcomeText: (name: string) => string;
  abstract shortDateFormat: string;
  abstract firstName: string;
  abstract lastName: string;
}
