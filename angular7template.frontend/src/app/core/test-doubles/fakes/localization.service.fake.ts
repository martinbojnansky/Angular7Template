import { LocalizationService } from '@app/core';
import { en, Locale, LocalizationValues } from '@assets/localization';
import { throwError } from 'rxjs';

export class LocalizationServiceFake implements LocalizationService {
  get locale(): Locale {
    return Locale.EN;
  }

  get values(): LocalizationValues {
    return en;
  }

  changeLocale(locale: Locale): void {
    throwError('Not implemented.');
  }
}
