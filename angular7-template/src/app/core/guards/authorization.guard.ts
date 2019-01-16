import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthorizationService } from '../services/';
import { AppRoutes } from '@shared/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {
  constructor(
    private authorizationService: AuthorizationService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const isAuthorized = this.authorizationService.isAuthorized();

    if (!isAuthorized) {
      this.router.navigate([AppRoutes.DEFAULT]);
    }

    return isAuthorized;
  }
}
