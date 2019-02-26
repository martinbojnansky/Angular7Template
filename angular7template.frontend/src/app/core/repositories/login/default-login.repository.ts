import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiRoute } from '@assets/constants';
import { LoginRepository } from './login.repository';

@Injectable()
export class DefaultLoginRepository implements LoginRepository {
  constructor(private httpClient: HttpClient) {}

  login(userName: string, password: string): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('username', userName);
    formData.append('password', password);

    return this.httpClient.post(
      `${ApiRoute.API}/${ApiRoute.LOGIN}`,
      formData,
      {
        responseType: 'text'
      }
    );
  }
}