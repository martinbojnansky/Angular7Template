import { TestBed } from '@angular/core/testing';

import { coreTestModuleDefFactory } from '@app/core/test-doubles';
import { LocalStorageKey } from '@assets/constants';
import {
  de,
  LocalizationSettings,
  Locale,
  locales
} from '@assets/localization';
import { LocalizationService, LocalStorageService } from '../..';
import { Local } from 'protractor/built/driverProviders';

describe('LocalizationService', () => {
  let service: LocalizationService;
  let localStorageServiceSpy: jasmine.SpyObj<LocalStorageService>;
  let localizationSettings: LocalizationSettings;
  let updateUISpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule(coreTestModuleDefFactory());

    service = TestBed.get(LocalizationService);
    localStorageServiceSpy = TestBed.get(LocalStorageService);
    localizationSettings = TestBed.get(LocalizationSettings);
    updateUISpy = spyOn(service, 'updateUI').and.callFake(() => {});
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return default locale when no locale is saved in local storage', () => {
    expect(localStorageServiceSpy.getItem).toHaveBeenCalledWith(
      LocalStorageKey.LOCALE
    );
    expect(service.locale).toBe(localizationSettings.defaultLocale);
  });

  it('should return default locale values when no locale is saved in local storage', () => {
    expect(localStorageServiceSpy.getItem).toHaveBeenCalledWith(
      LocalStorageKey.LOCALE
    );
    expect(service.values).toEqual(locales[localizationSettings.defaultLocale]);
  });

  it('should change the locale correctly', () => {
    service.changeLocale(Locale.DE);
    expect(service.locale).toBe(Locale.DE);
    expect(service.values).toEqual(locales[Locale.DE]);
    expect(localStorageServiceSpy.getItem(LocalStorageKey.LOCALE)).toBe(
      Locale.DE
    );
    expect(updateUISpy).toHaveBeenCalledTimes(1);
  });
});

describe('LocalizationService with saved locale', () => {
  let service: LocalizationService;
  let localStorageServiceSpy: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    TestBed.configureTestingModule(
      coreTestModuleDefFactory({
        localStorageValues: { [LocalStorageKey.LOCALE]: Locale.DE }
      })
    );

    service = TestBed.get(LocalizationService);
    localStorageServiceSpy = TestBed.get(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return saved locale when locale is saved in local storage', () => {
    expect(localStorageServiceSpy.getItem).toHaveBeenCalledWith(
      LocalStorageKey.LOCALE
    );
    expect(service.locale).toBe(Locale.DE);
  });

  it('should return locale values of saved locale when locale is saved in local storage', () => {
    expect(localStorageServiceSpy.getItem).toHaveBeenCalledWith(
      LocalStorageKey.LOCALE
    );
    expect(service.values).toEqual(de);
  });
});
