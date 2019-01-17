import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UsersRepositoryService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<Object> {
    return this.http.get('https://reqres.in/api/users');
  }
}
