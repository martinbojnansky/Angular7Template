import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../../services/';
import { ApiRoute } from '@assets/constants';

@Injectable()
export class AuthHeaderInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.indexOf(ApiRoute.BASE) >= 0) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.auth.state.token}`
        }
      });
    }
    return next.handle(request);
  }
}
