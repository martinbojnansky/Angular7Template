import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { Router } from '@angular/router';

import { LocalStorageKey, AppRoute, ApiRoute } from '@assets/constants';
import { JwtAuthService } from './jwt-auth.service';
import { LocalizationService, LocalStorageService } from '..';
import {
  routerSpyFactory,
  localStorageServiceSpyFactory,
  authInfoFakeFactory,
  localizationServiceSpyFactory,
  localStorageSpyFactory
} from '../../test-doubles';

describe('JwtAuthService', () => {
  let service: JwtAuthService;
  let localStorageServiceSpy: jasmine.SpyObj<LocalStorageService>;
  let routerSpy: jasmine.SpyObj<Router>;
  let httpTestingController: HttpTestingController;
  const authInfo = authInfoFakeFactory();
  const jwtToken = 'authToken123456789';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), HttpClientTestingModule],
      providers: [
        JwtAuthService,
        {
          provide: LocalStorageService,
          useFactory: localStorageServiceSpyFactory
        },
        {
          provide: Router,
          useFactory: routerSpyFactory
        },
        {
          provide: LocalizationService,
          useFactory: localizationServiceSpyFactory
        }
      ]
    });

    service = TestBed.get(JwtAuthService);
    localStorageServiceSpy = TestBed.get(LocalStorageService);
    routerSpy = TestBed.get(Router);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default state', () => {
    expect(service.state.isAuth).toBeFalsy();
    expect(service.state.token).toBeUndefined();
  });

  it('should change state, save token and redirect on sign in', async () => {
    await service.signIn(authInfo.userName, authInfo.password);
    httpTestingController
      .expectOne(`${ApiRoute.BASE}/${ApiRoute.LOGIN}`)
      .flush(jwtToken);

    expect(service.state.isAuth).toBeTruthy();
    expect(service.state.token).toBe(jwtToken);
    expect(localStorageServiceSpy.setItem).toHaveBeenCalledWith(
      LocalStorageKey.AUTH_TOKEN,
      jwtToken
    );
    expect(routerSpy.navigate).toHaveBeenCalledWith([AppRoute.AUTH]);
  });

  it('should change state, remove token and redirect on sign out', async () => {
    await service.signIn(authInfo.userName, authInfo.password);
    await service.signOut();
    httpTestingController
      .expectOne(`${ApiRoute.BASE}/${ApiRoute.LOGIN}`)
      .flush(jwtToken);

    expect(service.state.isAuth).toBeFalsy();
    expect(service.state.token).toBeNull();
    expect(localStorageServiceSpy.removeItem).toHaveBeenCalledWith(
      LocalStorageKey.AUTH_TOKEN
    );
    expect(routerSpy.navigate).toHaveBeenCalledWith([AppRoute.LOGIN]);
  });
});
