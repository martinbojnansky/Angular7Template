import { Injectable } from '@angular/core';

import { LocalizationService } from './localization.service';
import { LocalizationValues } from './localization-values';
import { Locale, locales } from './locales';
import { LocalStorageService } from '../storage';
import { LocalStorageKeys } from '@app/shared';
import { LocalizationSettings } from './localization-settings';

@Injectable()
export class DefaultLocalizationService implements LocalizationService {
  private locale: Locale;
  private values: LocalizationValues;

  constructor(
    private localizationSettings: LocalizationSettings,
    private localStorageService: LocalStorageService
  ) {
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

    const localeValues = locales[locale];

    if (localeValues) {
      this.saveLocaleSetting(locale);

      if (this.localizationSettings.useReload && reload) {
        location.reload();
        return;
      }

      this.locale = locale;
      this.values = locales[locale];
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
    this.changeLocale(this.localizationSettings.defaultLocale, false);
  }
}
