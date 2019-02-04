import { LocalizationValues } from './localization-values';
import { Locale } from './locales';

export abstract class LocalizationService {
  abstract get values(): LocalizationValues;
  abstract get locale(): Locale;
  abstract changeLocale(locale: Locale): void;
}
