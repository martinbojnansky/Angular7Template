import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';

import { ApiRoute, LocalStorageKey } from '@assets/constants';
import { AuthHeaderInterceptor } from './auth-header.interceptor';
import {
  authInfoFakeFactory,
  testModuleDefFactory
} from '@app/core/test-doubles';

describe('AuthHeaderInterceptor', () => {
  let interceptor: AuthHeaderInterceptor;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const authInfo = authInfoFakeFactory();

  beforeEach(() => {
    TestBed.configureTestingModule(
      testModuleDefFactory({
        localStorageValues: { [LocalStorageKey.AUTH_TOKEN]: authInfo.token }
      })
    );

    interceptor = TestBed.get(AuthHeaderInterceptor);
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add header when request contains api url', () => {
    httpClient.get(`${ApiRoute.BASE}/${ApiRoute.API}/xxx`).subscribe(() => {});
    const httpRequest = httpTestingController.expectOne(
      `${ApiRoute.BASE}/${ApiRoute.API}/xxx`
    );
    expect(httpRequest.request.headers.has('Authorization')).toBeTruthy();
    expect(httpRequest.request.headers.get('Authorization')).toEqual(
      `Bearer ${authInfo.token}`
    );
  });

  it('should not add header when request does not contain api url', () => {
    httpClient.get(`${ApiRoute.BASE}/xxx`).subscribe(() => {});
    const httpRequest = httpTestingController.expectOne(`${ApiRoute.BASE}/xxx`);
    expect(httpRequest.request.headers.has('Authorization')).toBeFalsy();
  });
});
