import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { AuthService } from '../../services';
import { FakeAuthServiceStub, routerSpyFactory } from '@app/core/test-doubles';
import { AppRoutes } from '@app/shared';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        AuthGuard,
        {
          provide: AuthService,
          useClass: FakeAuthServiceStub
        },
        {
          provide: Router,
          useFactory: routerSpyFactory
        }
      ]
    });

    guard = TestBed.get(AuthGuard);
    authService = TestBed.get(AuthService);
    routerSpy = TestBed.get(Router);
  });

  it('should inject guard', () => {
    expect(guard).toBeTruthy();
  });

  it('should activate when signed in', () => {
    authService.signIn();
    expect(guard.canActivate(null, null)).toBeTruthy();
  });

  it('should not activate when not signed in', () => {
    expect(guard.canActivate(null, null)).toBeFalsy();
  });

  it('should navigate to login route when not signed in', () => {
    guard.canActivate(null, null);
    expect(routerSpy.navigate).toHaveBeenCalledWith([`${AppRoutes.LOGIN}`]);
  });
});
