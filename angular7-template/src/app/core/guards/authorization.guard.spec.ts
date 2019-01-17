import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { AuthorizationGuard } from './authorization.guard';
import { AuthorizationService } from '../services';
import { AppRoutes } from '@app/shared/';

describe('AuthorizationGuard', () => {
  let guard: AuthorizationGuard;
  let authorizationServiceSpy: jasmine.SpyObj<AuthorizationService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        AuthorizationGuard,
        {
          provide: AuthorizationService,
          useValue: jasmine.createSpyObj('AuthorizationService', [
            'isAuthorized'
          ])
        },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate'])
        }
      ]
    });

    guard = TestBed.get(AuthorizationGuard);
    authorizationServiceSpy = TestBed.get(AuthorizationService);
    routerSpy = TestBed.get(Router);
  });

  it('should inject guard', () => {
    expect(guard).toBeTruthy();
  });

  it('should activate when is authorized === true', () => {
    authorizationServiceSpy.isAuthorized.and.returnValue(true);
    expect(guard.canActivate(null, null)).toBeTruthy();
  });

  it('should not activate when is authorized === false', () => {
    authorizationServiceSpy.isAuthorized.and.returnValue(false);
    expect(guard.canActivate(null, null)).toBeFalsy();
  });

  it('should navigate to login route when is authorized === false', () => {
    authorizationServiceSpy.isAuthorized.and.returnValue(false);
    guard.canActivate(null, null);
    expect(routerSpy.navigate).toHaveBeenCalledWith([`${AppRoutes.LOGIN}`]);
  });
});
