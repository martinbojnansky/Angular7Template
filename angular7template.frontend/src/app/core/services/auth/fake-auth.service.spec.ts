import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { LocalStorageKey, AppRoute } from '@assets/constants';
import { FakeAuthService } from './fake-auth.service';
import { LocalizationService, LocalStorageService } from '@app/core/services';
import {
  routerSpyFactory,
  localStorageServiceSpyFactory,
  authInfoFakeFactory,
  localizationServiceSpyFactory
} from '@app/core/test-doubles';

describe('FakeAuthService', () => {
  let service: FakeAuthService;
  let storageServiceSpy: jasmine.SpyObj<LocalStorageService>;
  let routerSpy: jasmine.SpyObj<Router>;
  const authInfo = authInfoFakeFactory();

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
        },
        {
          provide: LocalizationService,
          useFactory: localizationServiceSpyFactory
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
    service.signIn(authInfo.userName, authInfo.password);
    expect(service.state.isAuth).toBeTruthy();
  });

  it('should change isAuth state on sign out', async () => {
    await service.signIn(authInfo.userName, authInfo.password);
    await service.signOut();
    expect(service.state.isAuth).toBeFalsy();
  });

  it('should navigate to admin route on sign in', async () => {
    await service.signIn(authInfo.userName, authInfo.password);
    expect(routerSpy.navigate).toHaveBeenCalledWith([AppRoute.AUTH]);
  });

  it('should navigate to login route on sign out', async () => {
    await service.signOut();
    expect(routerSpy.navigate).toHaveBeenCalledWith([AppRoute.LOGIN]);
  });

  it('should save token on sign in', async () => {
    await service.signIn(authInfo.userName, authInfo.password);
    expect(storageServiceSpy.setItem.calls.mostRecent().args[0]).toBe(
      LocalStorageKey.AUTHORIZATION_TOKEN
    );
  });

  it('should remove token on sign out', async () => {
    await service.signOut();
    expect(storageServiceSpy.removeItem).toHaveBeenCalledWith(
      LocalStorageKey.AUTHORIZATION_TOKEN
    );
  });
});
