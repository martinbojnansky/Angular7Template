import { LocaleValues } from './locale-values';
import { Locale } from './locale';

export abstract class LocaleService {
  abstract getValues(): LocaleValues;
  abstract getLocale(): Locale;
  abstract changeLocale(locale: Locale): void;
}
