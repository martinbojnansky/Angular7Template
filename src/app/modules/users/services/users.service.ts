import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { StoreService } from '@app/core';
import { User } from '../models';

export class UsersServiceState {
  users: User[];
  selectedUser: User;
}

@Injectable()
export class UsersService extends StoreService<UsersServiceState> {
  constructor(private http: HttpClient) {
    super(new UsersServiceState());
  }

  fetchUsers(): Observable<any> {
    const observable = this.http.get('https://reqres.in/api/users');
    observable.subscribe(r => {
      this.setState({ ...this.state, users: (<any>r).data });
    });
    return observable;
  }

  selectUser(user: User) {
    this.setState({ ...this.state, selectedUser: user });
  }

  unselectUser(user: User) {
    this.setState({ ...this.state, selectedUser: null });
  }
}
