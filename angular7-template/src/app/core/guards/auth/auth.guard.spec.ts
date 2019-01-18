import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { AuthService } from '../../services';
import { AppRoutes } from '@app/shared/';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        AuthGuard,
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', ['isAuth'])
        },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate'])
        }
      ]
    });

    guard = TestBed.get(AuthGuard);
    authServiceSpy = TestBed.get(AuthService);
    routerSpy = TestBed.get(Router);
  });

  it('should inject guard', () => {
    expect(guard).toBeTruthy();
  });

  it('should activate when is authorized === true', () => {
    authServiceSpy.isAuth.and.returnValue(true);
    expect(guard.canActivate(null, null)).toBeTruthy();
  });

  it('should not activate when is authorized === false', () => {
    authServiceSpy.isAuth.and.returnValue(false);
    expect(guard.canActivate(null, null)).toBeFalsy();
  });

  it('should navigate to login route when is authorized === false', () => {
    authServiceSpy.isAuth.and.returnValue(false);
    guard.canActivate(null, null);
    expect(routerSpy.navigate).toHaveBeenCalledWith([`${AppRoutes.LOGIN}`]);
  });
});
