import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { LocalStorageKeys, AppRoutes } from '@assets/constants';
import { FakeAuthService } from './fake-auth.service';
import { LocalStorageService } from '@app/core/services';
import {
  routerSpyFactory,
  localStorageServiceSpyFactory
} from '@app/core/test-doubles/spies';

describe('FakeAuthService', () => {
  let service: FakeAuthService;
  let storageServiceSpy: jasmine.SpyObj<LocalStorageService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        FakeAuthService,
        {
          provide: LocalStorageService,
          useFactory: localStorageServiceSpyFactory
        },
        {
          provide: Router,
          useFactory: routerSpyFactory
        }
      ]
    });

    service = TestBed.get(FakeAuthService);
    storageServiceSpy = TestBed.get(LocalStorageService);
    routerSpy = TestBed.get(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have isAuth state false by default', () => {
    expect(service.state.isAuth).toBeFalsy();
  });

  it('should change isAuth state on sign in', () => {
    service.signIn();
    expect(service.state.isAuth).toBeTruthy();
  });

  it('should change isAuth state on sign out', () => {
    service.signOut();
    expect(service.state.isAuth).toBeFalsy();
  });

  it('should navigate to admin route on sign in', () => {
    service.signIn();
    expect(routerSpy.navigate).toHaveBeenCalledWith([AppRoutes.AUTH]);
  });

  it('should navigate to login route on sign out', () => {
    service.signOut();
    expect(routerSpy.navigate).toHaveBeenCalledWith([AppRoutes.LOGIN]);
  });

  it('should save token on sign in', () => {
    service.signIn();
    expect(storageServiceSpy.setItem.calls.mostRecent().args[0]).toBe(
      LocalStorageKeys.AUTHORIZATION_TOKEN
    );
  });

  it('should remove token on sign out', () => {
    service.signOut();
    expect(storageServiceSpy.removeItem).toHaveBeenCalledWith(
      LocalStorageKeys.AUTHORIZATION_TOKEN
    );
  });
});
