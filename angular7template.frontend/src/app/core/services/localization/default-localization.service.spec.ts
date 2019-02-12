import { TestBed } from '@angular/core/testing';

import { DefaultLocalizationService, LocalStorageService } from '../..';
import { localStorageServiceSpyFactory } from '../../test-doubles';
import { LocalStorageKey } from '../../../../assets/constants';
import {
  en,
  de,
  LocalizationSettings,
  Locale
} from '../../../../assets/localization';

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
      LocalStorageKey.LOCALE
    );
    expect(service.locale).toBe(new LocalizationSettings().defaultLocale);
  });

  it('should return default locales when no locale id is saved in local storage', () => {
    expect(localStorageServiceSpy.getItem).toHaveBeenCalledWith(
      LocalStorageKey.LOCALE
    );
    expect(service.values).toEqual(en);
  });

  it('should change the locale correctly', () => {
    localStorageServiceSpy.getItem.and.returnValue(Locale.DE);
    service.changeLocale(Locale.DE, () => {});
    expect(service.locale).toBe(Locale.DE);
    expect(service.values).toEqual(de);
    expect(localStorageServiceSpy.setItem).toHaveBeenCalledWith(
      LocalStorageKey.LOCALE,
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
