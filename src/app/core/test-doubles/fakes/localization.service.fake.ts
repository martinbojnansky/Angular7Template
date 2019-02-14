import { LocalizationService } from '@app/core';
import { throwError } from 'rxjs';

import { en, Locale, LocalizationValues } from '@assets/localization';

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
