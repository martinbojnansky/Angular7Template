import { TestBed } from '@angular/core/testing';

import { coreTestModuleDefFactory } from '@app/core/test-doubles';
import { LocalStorageKey } from '@assets/constants';
import { en, de, LocalizationSettings, Locale } from '@assets/localization';
import { LocalizationService, LocalStorageService } from '../..';

describe('LocalizationService', () => {
  let service: LocalizationService;
  let localStorageServiceSpy: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    TestBed.configureTestingModule(coreTestModuleDefFactory());

    service = TestBed.get(LocalizationService);
    localStorageServiceSpy = TestBed.get(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return  locale when no locale id is saved in local storage', () => {
    expect(localStorageServiceSpy.getItem).toHaveBeenCalledWith(
      LocalStorageKey.LOCALE
    );
    expect(service.locale).toBe(new LocalizationSettings().defaultLocale);
  });

  it('should return  locales when no locale id is saved in local storage', () => {
    expect(localStorageServiceSpy.getItem).toHaveBeenCalledWith(
      LocalStorageKey.LOCALE
    );
    expect(service.values).toEqual(en);
  });

  it('should change the locale correctly', () => {
    localStorageServiceSpy.getItem.and.returnValue(Locale.DE);
    service.changeLocale(Locale.DE);
    expect(service.locale).toBe(Locale.DE);
    expect(service.values).toEqual(de);
    expect(localStorageServiceSpy.setItem).toHaveBeenCalledWith(
      LocalStorageKey.LOCALE,
      Locale.DE
    );
    // expect(locationSpy).toHaveBeenCalledTimes(1);
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

  it('should return saved locale when locale id is saved in local storage', () => {
    expect(localStorageServiceSpy.getItem).toHaveBeenCalledWith(
      LocalStorageKey.LOCALE
    );
    expect(service.locale).toBe(Locale.DE);
  });

  it('should return locales of saved locale when locale id is saved in local storage', () => {
    localStorageServiceSpy.getItem.and.returnValues(Locale.DE.toString());

    expect(localStorageServiceSpy.getItem).toHaveBeenCalledWith(
      LocalStorageKey.LOCALE
    );
    expect(service.values).toEqual(de);
  });
});
