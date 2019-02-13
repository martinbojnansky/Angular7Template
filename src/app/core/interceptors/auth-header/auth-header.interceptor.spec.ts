import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { AuthHeaderInterceptor } from './auth-header.interceptor';
import { AuthService, LocalStorageService } from '@app/core';
import { authInfoFakeFactory } from '@app/core/test-doubles';
import { ApiRoute } from '@assets/constants';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { JwtAuthServiceStub } from '@app/core/test-doubles/stubs/jwt-auth.service.stub';

describe('AuthHeaderInterceptor', () => {
  let interceptor: AuthHeaderInterceptor;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const authInfo = authInfoFakeFactory();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthHeaderInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthHeaderInterceptor,
          multi: true
        },
        {
          provide: AuthService,
          useClass: JwtAuthServiceStub
        }
      ]
    });

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

  // TODO: Fix test
  // it('should add header when request contains api url', () => {
  //   httpClient.get(`${ApiRoute.BASE}/${ApiRoute.API}/xxx`).subscribe(() => {});
  //   const httpRequest = httpTestingController.expectOne(
  //     `${ApiRoute.BASE}/${ApiRoute.API}/xxx`
  //   );
  //   expect(httpRequest.request.headers.has('Authorization')).toBeTruthy();
  //   expect(httpRequest.request.headers['Authorization']).toEqual(
  //     `Bearer ${authInfo.token}`
  //   );
  // });

  it('should not add header when request does not contain api url', () => {
    httpClient.get(`${ApiRoute.BASE}/xxx`).subscribe(() => {});
    const httpRequest = httpTestingController.expectOne(`${ApiRoute.BASE}/xxx`);
    expect(httpRequest.request.headers.has('Authorization')).toBeFalsy();
  });
});
