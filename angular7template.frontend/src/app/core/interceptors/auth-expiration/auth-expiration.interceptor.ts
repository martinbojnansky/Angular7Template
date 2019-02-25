import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import {EMPTY, Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ApiRoute } from '@assets/constants';
import { AuthService } from '../../services/';

@Injectable()
export class AuthExpirationInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.indexOf(`${ApiRoute.API}/`) >= 0 && request.url.indexOf(`${ApiRoute.API}/${ApiRoute.LOGIN}`) === -1) {
      return next.handle(request).pipe(
        catchError(this.handleError.bind(this))
      );
    }

    return next.handle(request);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status && error.status === 401) {
      this.authService.signOut();
      return EMPTY;
    } else {
      return throwError(error);
    }
  }
}
