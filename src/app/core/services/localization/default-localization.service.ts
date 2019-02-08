import { Injectable } from '@angular/core';

import { LocalizationService } from './localization.service';
import { LocalStorageService } from '../storage';
import { LocalStorageKey } from '@assets/constants';
import {
  Locale,
  locales,
  LocalizationSettings,
  LocalizationValues
} from '@assets/localization';

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

  changeLocale(locale: Locale, onApply: () => void = this.reload) {
    if (this.locale === locale) {
      return;
    }

    this.setLocale(locale);
    onApply();
  }

  private restoreLocaleSetting(): void {
    const localeSetting = <Locale>(
      this.localStorageService.getItem(LocalStorageKey.LOCALE)
    );

    if (localeSetting) {
      this.setLocale(localeSetting);
    } else {
      this.setDefaultLocale();
    }
  }

  private setLocale(locale: Locale) {
    if (locales[locale]) {
      this._locale = locale;
      this._values = locales[locale];
      this.localStorageService.setItem(LocalStorageKey.LOCALE, locale);
    } else {
      throw new Error(`Locale ${locale} not supported.`);
    }
  }

  private setDefaultLocale() {
    this.setLocale(this.localizationSettings.defaultLocale);
  }

  private reload() {
    window.location.reload();
  }
}