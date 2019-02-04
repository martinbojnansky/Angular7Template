import { Injectable } from '@angular/core';

import { LocalizationService } from './localization.service';
import { LocalizationValues } from './localization-values';
import { Locale, locales } from './locales';
import { LocalStorageService } from '../storage';
import { LocalStorageKeys } from '@assets/constants';
import { LocalizationSettings } from './localization-settings';

@Injectable()
export class DefaultLocalizationService implements LocalizationService {
  private _locale: Locale;
  private _values: LocalizationValues;

  constructor(
    private localizationSettings: LocalizationSettings,
    private localStorageService: LocalStorageService
  ) {
    this.restoreLocaleSetting();
  }

  get locale(): Locale {
    return this._locale;
  }

  get values(): LocalizationValues {
    return this._values;
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

      this._locale = locale;
      this._values = locales[locale];
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
