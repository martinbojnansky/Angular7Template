import { Locale, LocalizationValues } from '@assets/localization';

export abstract class LocalizationService {
  abstract get values(): LocalizationValues;
  abstract get locale(): Locale;
  abstract changeLocale(locale: Locale): void;
}
