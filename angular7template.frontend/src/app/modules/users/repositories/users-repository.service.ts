import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiRoute } from '@assets/constants';

@Injectable()
export class UsersRepositoryService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<any> {
    return this.httpClient.get(`${ApiRoute.BASE}${ApiRoute.USERS}`);
  }
}
