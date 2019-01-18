import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;
  let serviceLengthSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService]
    });

    serviceLengthSpy = spyOnProperty(localStorage, 'length').and.returnValue(1);
    service = TestBed.get(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize length property', () => {
    expect(service.length).toBe(1);
  });

  it('should call clear correctly', () => {
    const spy = spyOn(localStorage, 'clear');
    serviceLengthSpy.and.returnValue(0);
    service.clear();
    expect(spy).toHaveBeenCalled();
    expect(service.length).toBe(0);
  });

  it('should call getItem correctly', () => {
    const spy = spyOn(localStorage, 'getItem').and.returnValue('value');
    const result = service.getItem('key');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('key');
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
    const spy = spyOn(localStorage, 'removeItem');
    serviceLengthSpy.and.returnValue(0);
    service.removeItem('key');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('key');
    expect(service.length).toBe(0);
  });

  it('should call setItem correctly', () => {
    const spy = spyOn(localStorage, 'setItem');
    serviceLengthSpy.and.returnValue(2);
    service.setItem('key', 'value');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('key', 'value');
    expect(service.length).toBe(2);
  });
});
