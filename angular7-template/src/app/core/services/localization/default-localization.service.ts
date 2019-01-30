import { Injectable } from '@angular/core';

import { LocalizationService } from './localization.service';
import { LocalizationValues } from './localization-values';
import { Locale } from './locale';
import * as values from '@assets/locales';
import { LocalStorageService } from '../storage';
import { LocalStorageKeys } from '@app/shared';

@Injectable()
export class DefaultLocalizationService implements LocalizationService {
  readonly locales = {
    [Locale.EN]: values.en,
    [Locale.DE]: values.de
  };

  private locale: Locale;
  private values: LocalizationValues;

  constructor(private localStorageService: LocalStorageService) {
    this.restoreLocaleSetting();
  }

  getLocale(): Locale {
    return this.locale;
  }

  getValues(): LocalizationValues {
    return this.values;
  }

  changeLocale(locale: Locale, reload: boolean = true) {
    if (this.locale === locale) {
      return;
    }

    const localeValues = this.locales[locale];

    if (localeValues) {
      this.saveLocaleSetting(locale);

      // Comment this condition if you're not using ChangeDetectionStrategy.OnPush
      if (reload) {
        location.reload();
        return;
      }

      this.locale = locale;
      this.values = this.locales[locale];
    } else {
      this.setDefaultLocale();
    }
  }

  private restoreLocaleSetting(): void {
    const localeSetting = <Locale>(
      this.localStorageService.getItem(LocalStorageKeys.LOCALE)
    );

    if (localeSetting) {
      this.changeLocale(localeSetting, false);
    } else {
      this.setDefaultLocale();
    }
  }

  private saveLocaleSetting(locale: Locale) {
    this.localStorageService.setItem(LocalStorageKeys.LOCALE, locale);
  }

  private setDefaultLocale() {
    this.changeLocale(Locale.EN, false);
  }
}
