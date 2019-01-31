import { LocalizationValues } from './localization-values';
import { Locale } from './locales';

export abstract class LocalizationService {
  abstract getValues(): LocalizationValues;
  abstract getLocale(): Locale;
  abstract changeLocale(locale: Locale): void;
}
