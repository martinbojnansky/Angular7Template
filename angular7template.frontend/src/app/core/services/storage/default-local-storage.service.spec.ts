import { TestBed } from '@angular/core/testing';

import { DefaultLocalStorageService } from './default-local-storage.service';
import { localStorageSpyFactory } from '../../test-doubles/spies';

describe('LocalStorageService', () => {
  let service: DefaultLocalStorageService;
  let localStorageSpy: jasmine.SpyObj<Storage>;

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
    service = TestBed.get(DefaultLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call clear correctly', () => {
    service.clear();
    expect(localStorageSpy.clear).toHaveBeenCalled();
  });

  it('should call getItem correctly', () => {
    const result = service.getItem('key');
    expect(localStorageSpy.getItem).toHaveBeenCalledTimes(1);
    expect(localStorageSpy.getItem).toHaveBeenCalledWith('key');
    expect(result).toBe('value');
  });

  it('should call key correctly', () => {
    const result = service.key(1);
    expect(localStorageSpy.key).toHaveBeenCalledTimes(1);
    expect(localStorageSpy.key).toHaveBeenCalledWith(1);
    expect(result).toBe('key');
  });

  it('should call removeItem correctly', () => {
    service.removeItem('key');
    expect(localStorageSpy.removeItem).toHaveBeenCalledTimes(1);
    expect(localStorageSpy.removeItem).toHaveBeenCalledWith('key');
  });

  it('should call setItem correctly', () => {
    service.setItem('key', 'value');
    expect(localStorageSpy.setItem).toHaveBeenCalledTimes(1);
    expect(localStorageSpy.setItem).toHaveBeenCalledWith('key', 'value');
  });
});
