import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

import { AuthService } from '../../services';
import { AppRoutes } from '@app/shared';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const isAuthorized = this.authService.isAuth();

    if (!isAuthorized) {
      this.router.navigate([AppRoutes.LOGIN]);
    }

    return isAuthorized;
  }
}
