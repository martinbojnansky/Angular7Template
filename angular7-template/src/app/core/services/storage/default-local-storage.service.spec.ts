import { TestBed } from '@angular/core/testing';

import { DefaultLocalStorageService } from './default-local-storage.service';
import { localStorageSpyFactory } from '@app/core/spies';

describe('LocalStorageService', () => {
  let service: DefaultLocalStorageService;
  let localStorageSpy: jasmine.SpyObj<Storage>;
  let serviceLengthSpy: jasmine.Spy;

  beforeEach(() => {
    localStorageSpy = localStorageSpyFactory();

    TestBed.configureTestingModule({
      providers: [
        {
          provide: DefaultLocalStorageService,
          useFactory: () => new DefaultLocalStorageService(localStorageSpy)
        }
      ]
    });
    serviceLengthSpy = spyOnProperty(localStorage, 'length').and.returnValue(1);
    service = TestBed.get(DefaultLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize length property', () => {
    expect(service.length).toBe(1);
  });

  it('should call clear correctly', () => {
    serviceLengthSpy.and.returnValue(0);
    service.clear();
    expect(localStorageSpy.clear).toHaveBeenCalled();
    expect(service.length).toBe(0);
  });

  it('should call getItem correctly', () => {
    const result = service.getItem('key');
    expect(localStorageSpy.getItem).toHaveBeenCalledTimes(1);
    expect(localStorageSpy.getItem).toHaveBeenCalledWith('key');
    expect(result).toBe('value');
  });

  it('should call key correctly', () => {
    const spy = spyOn(localStorage, 'key').and.returnValue('key');
    const result = service.key(1);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(1);
    expect(result).toBe('key');
  });

  it('should call removeItem correctly', () => {
    serviceLengthSpy.and.returnValue(0);
    service.removeItem('key');
    expect(localStorageSpy.removeItem).toHaveBeenCalledTimes(1);
    expect(localStorageSpy.removeItem).toHaveBeenCalledWith('key');
    expect(service.length).toBe(0);
  });

  it('should call setItem correctly', () => {
    serviceLengthSpy.and.returnValue(2);
    service.setItem('key', 'value');
    expect(localStorageSpy.setItem).toHaveBeenCalledTimes(1);
    expect(localStorageSpy.setItem).toHaveBeenCalledWith('key', 'value');
    expect(service.length).toBe(2);
  });
});
