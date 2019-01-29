import { Injectable } from '@angular/core';

import { LocaleService } from './locale.service';
import { LocaleValues } from './locale-values';
import { Locale } from './locale';
import * as values from '@assets/locales';
import { LocalStorageService } from '../storage';
import { LocalStorageKeys } from '@app/shared';

@Injectable()
export class DefaultLocaleService implements LocaleService {
  readonly locales = {
    [Locale.EN]: values.en,
    [Locale.DE]: values.de
  };

  private locale: Locale;
  private values: LocaleValues;

  constructor(private localStorageService: LocalStorageService) {
    this.restoreLocaleSetting();
  }

  getLocale(): Locale {
    return this.locale;
  }

  getValues(): LocaleValues {
    return this.values;
  }

  changeLocale(locale: Locale) {
    this.values = this.locales[locale];

    if (this.values) {
      this.locale = locale;
      this.saveLocaleSetting(locale);
    } else {
      this.setDefaultLocale();
    }
  }

  private restoreLocaleSetting(): void {
    const localeSetting = <Locale>(
      this.localStorageService.getItem(LocalStorageKeys.LOCALE)
    );

    if (localeSetting) {
      this.changeLocale(localeSetting);
    } else {
      this.setDefaultLocale();
    }
  }

  private saveLocaleSetting(locale: Locale) {
    this.localStorageService.setItem(LocalStorageKeys.LOCALE, locale);
  }

  private setDefaultLocale() {
    this.changeLocale(Locale.EN);
  }
}
