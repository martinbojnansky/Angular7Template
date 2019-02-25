import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiRoute } from '@assets/constants';
import { AuthService } from '../../services/';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.indexOf(`${ApiRoute.API}`) >= 0) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.state.token}`
        }
      });
    }
    return next.handle(request);
  }
}
