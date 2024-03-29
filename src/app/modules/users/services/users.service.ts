import { Injectable } from '@angular/core';

import { Store } from '@app/core';
import { User } from '../models';
import { UsersRepository } from '../repositories';

export class UsersServiceState {
  users: User[];
  selectedUser: User;
}

@Injectable()
export class UsersService extends Store<UsersServiceState> {
  constructor(private usersRepository: UsersRepository) {
    super(new UsersServiceState());
  }

  fetchUsers(): void {
    this.usersRepository.getAll().subscribe(r => {
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
