import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { LocalStorageKey, AppRoute } from '@assets/constants';
import { AuthService, LocalStorageService } from '..';
import {
  authInfoFakeFactory,
  coreTestModuleDefFactory
} from '../../test-doubles';

describe('AuthService', () => {
  let service: AuthService;
  let localStorageServiceSpy: jasmine.SpyObj<LocalStorageService>;
  let routerSpy: jasmine.SpyObj<Router>;
  const authInfo = authInfoFakeFactory();

  beforeEach(() => {
    TestBed.configureTestingModule(coreTestModuleDefFactory());

    service = TestBed.get(AuthService);
    localStorageServiceSpy = TestBed.get(LocalStorageService);
    routerSpy = TestBed.get(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default state', () => {
    expect(service.state).toEqual({
      isAuth: false,
      token: null,
      error: null
    });
  });

  it('should sign in', () => {
    service.signIn(authInfo.userName, authInfo.password);
    expect(service.state.isAuth).toBeTruthy();
    expect(service.state.token).toBe(authInfo.token);
    expect(service.state.error).toBeNull();
    expect(localStorageServiceSpy.setItem).toHaveBeenCalledWith(
      LocalStorageKey.AUTH_TOKEN,
      authInfo.token
    );
    expect(routerSpy.navigate).toHaveBeenCalledWith([AppRoute.AUTH]);
  });

  it('should set error on invalid sign in', () => {
    service.signIn('', '');
    expect(service.state.isAuth).toBeFalsy();
    expect(service.state.token).toBeNull();
    expect(service.state.error).not.toBeNull();
    expect(localStorageServiceSpy.setItem).not.toHaveBeenCalledWith(
      LocalStorageKey.AUTH_TOKEN,
      authInfo.token
    );
    expect(routerSpy.navigate).toHaveBeenCalledTimes(0);
  });

  it('should sign out', () => {
    service.signIn(authInfo.userName, authInfo.password);
    service.signOut();
    expect(service.state.isAuth).toBeFalsy();
    expect(service.state.token).toBeNull();
    expect(localStorageServiceSpy.removeItem).toHaveBeenCalledWith(
      LocalStorageKey.AUTH_TOKEN
    );
    expect(routerSpy.navigate).toHaveBeenCalledWith([AppRoute.LOGIN]);
  });
});
