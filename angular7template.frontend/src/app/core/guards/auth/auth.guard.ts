import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

import { AuthService } from '../../services';
import { AppRoute } from '@assets/constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const isAuthorized = this.authService.state.isAuth;

    if (!isAuthorized) {
      this.router.navigate([AppRoute.LOGIN]);
    }

    return isAuthorized;
  }
}
