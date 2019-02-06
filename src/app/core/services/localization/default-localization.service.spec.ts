import { TestBed } from '@angular/core/testing';

import {
  DefaultLocalizationService,
  LocalizationSettings,
  LocalStorageService,
  Locale
} from '@app/core';
import { localStorageServiceSpyFactory } from '@app/core/test-doubles';
import { LocalStorageKeys } from '@assets/constants';
import { en, de } from '@assets/locales';

describe('DefaultLocalizationService', () => {
  let service: DefaultLocalizationService;
  let localStorageServiceSpy: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DefaultLocalizationService,
        {
          provide: LocalizationSettings,
          useClass: LocalizationSettings
        },
        {
          provide: LocalStorageService,
          useFactory: localStorageServiceSpyFactory
        }
      ]
    });

    service = TestBed.get(DefaultLocalizationService);
    localStorageServiceSpy = TestBed.get(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return default locale when no locale id is saved in local storage', () => {
    expect(localStorageServiceSpy.getItem).toHaveBeenCalledWith(
      LocalStorageKeys.LOCALE
    );
    expect(service.locale).toBe(new LocalizationSettings().defaultLocale);
  });

  it('should return default values when no locale id is saved in local storage', () => {
    expect(localStorageServiceSpy.getItem).toHaveBeenCalledWith(
      LocalStorageKeys.LOCALE
    );
    expect(service.values).toEqual(en);
  });

  it('should change the locale correctly', () => {
    localStorageServiceSpy.getItem.and.returnValue(Locale.DE);
    service.changeLocale(Locale.DE, () => {});
    expect(service.locale).toBe(Locale.DE);
    expect(service.values).toEqual(de);
    expect(localStorageServiceSpy.setItem).toHaveBeenCalledWith(
      LocalStorageKeys.LOCALE,
      Locale.DE
    );
    // expect(locationSpy).toHaveBeenCalledTimes(1);
  });
});

describe('DefaultLocalizationService with saved locale', () => {
  let service: DefaultLocalizationService;
  let localStorageServiceSpy: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    localStorageServiceSpy = localStorageServiceSpyFactory();
    localStorageServiceSpy.getItem.and.callFake(() => Locale.DE);

    TestBed.configureTestingModule({
      providers: [
        DefaultLocalizationService,
        {
          provide: LocalizationSettings,
          useClass: LocalizationSettings
        },
        {
          provide: LocalStorageService,
          useValue: localStorageServiceSpy
        }
      ]
    });

    service = TestBed.get(DefaultLocalizationService);
    localStorageServiceSpy = TestBed.get(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return saved locale when locale id is saved in local storage', () => {
    expect(localStorageServiceSpy.getItem).toHaveBeenCalledWith(
      LocalStorageKeys.LOCALE
    );
    expect(service.locale).toBe(Locale.DE);
  });

  it('should return values of saved locale when locale id is saved in local storage', () => {
    localStorageServiceSpy.getItem.and.returnValues(Locale.DE.toString());

    expect(localStorageServiceSpy.getItem).toHaveBeenCalledWith(
      LocalStorageKeys.LOCALE
    );
    expect(service.values).toEqual(de);
  });
});
