import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from '@app/core';
import {ApiRoute, AppRoute, LocalStorageKey} from '@assets/constants';
import { AuthExpirationInterceptor } from './auth-expiration.interceptor';
import {
  authInfoFakeFactory,
  coreTestModuleDefFactory
} from '@app/core/test-doubles';

describe('AuthExpirationInterceptor', () => {
  let interceptor: AuthExpirationInterceptor;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let authService: AuthService;
  let routerSpy: jasmine.SpyObj<Router>;
  const errorEvent = new ErrorEvent('Error', { message: 'Unathorized' });
  const errorOpts = { status: 401 };
  const authInfo = authInfoFakeFactory();

  beforeEach(() => {
    TestBed.configureTestingModule(
      coreTestModuleDefFactory({
        localStorageValues: { [LocalStorageKey.AUTH_TOKEN]: authInfo.token }
      })
    );

    interceptor = TestBed.get(AuthExpirationInterceptor);
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    authService = TestBed.get(AuthService);
    routerSpy = TestBed.get(Router);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should sign out on 401, when request contain api url', () => {
    httpClient.get(`${ApiRoute.API}/xxx`).subscribe(() => {}, () => {});
    const httpRequest = httpTestingController
      .expectOne(`${ApiRoute.API}/xxx`)
      .error(errorEvent, errorOpts);
    expect(authService.state.isAuth).toBeFalsy();
    expect(routerSpy.navigate).toHaveBeenCalledWith([AppRoute.LOGIN]);
  });

  it('should not sign out on 401, when request does not contain api url', () => {
    httpClient.get(`/xxx`).subscribe(() => {}, () => {});
    const httpRequest = httpTestingController
      .expectOne(`/xxx`)
      .error(errorEvent, errorOpts);
    expect(authService.state.isAuth).toBeTruthy();
    expect(routerSpy.navigate).not.toHaveBeenCalledWith([AppRoute.LOGIN]);
  });

  it('should not sign out on 401, when request contain api login url', () => {
    httpClient.get(`${ApiRoute.API}/login`).subscribe(() => {}, () => {});
    const httpRequest = httpTestingController
      .expectOne(`${ApiRoute.API}/login`)
      .error(errorEvent, errorOpts);
    expect(authService.state.isAuth).toBeTruthy();
    expect(routerSpy.navigate).not.toHaveBeenCalledWith([AppRoute.LOGIN]);
  });

  it('should not sign out on other than 401, when request contain api url', () => {
    httpClient.get(`${ApiRoute.API}/xxx`).subscribe(() => {}, () => {});
    const httpRequest = httpTestingController
      .expectOne(`${ApiRoute.API}/xxx`)
      .error(errorEvent, { status: 500 });
    expect(authService.state.isAuth).toBeTruthy();
    expect(routerSpy.navigate).not.toHaveBeenCalledWith([AppRoute.LOGIN]);
  });
});
