import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthGuard, AuthService } from '@app/core';
import {
  authInfoFakeFactory,
  coreTestModuleDefFactory
} from '@app/core/test-doubles';
import { AppRoute } from '@assets/constants';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let routerSpy: jasmine.SpyObj<Router>;
  const authInfo = authInfoFakeFactory();

  beforeEach(() => {
    TestBed.configureTestingModule(coreTestModuleDefFactory());
    guard = TestBed.get(AuthGuard);
    authService = TestBed.get(AuthService);
    routerSpy = TestBed.get(Router);
  });

  it('should inject guard', () => {
    expect(guard).toBeTruthy();
  });

  it('should activate when signed in', () => {
    authService.signIn(authInfo.userName, authInfo.password);
    expect(guard.canActivate(null, null)).toBeTruthy();
  });

  it('should not activate when not signed in', () => {
    expect(guard.canActivate(null, null)).toBeFalsy();
  });

  it('should not activate when signed out', () => {
    authService.signIn(authInfo.userName, authInfo.password);
    authService.signOut();
    expect(guard.canActivate(null, null)).toBeFalsy();
  });

  it('should navigate to login route when not signed in', () => {
    guard.canActivate(null, null);
    expect(routerSpy.navigate).toHaveBeenCalledWith([`${AppRoute.LOGIN}`]);
  });
});
