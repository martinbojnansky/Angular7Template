import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

import { StoreService } from '@app/core';
import { ApiRoute } from '@assets/constants';
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

  fetchUsers(): void {
    const observable = this.http.get(`${ApiRoute.BASE}${ApiRoute.USERS}`);
    observable.subscribe(r => {
      this.setState({ ...this.state, users: (<any>r).data });
    });
  }

  selectUser(user: User) {
    this.setState({ ...this.state, selectedUser: user });
  }

  unselectUser(user: User) {
    this.setState({ ...this.state, selectedUser: null });
  }
}
