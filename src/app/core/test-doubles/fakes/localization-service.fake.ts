import {Locale, LocalizationService, LocalizationValues} from '@app/core';
import {en} from '@assets/locales';
import {throwError} from 'rxjs';

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
