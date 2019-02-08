import { Injectable } from '@angular/core';

import { StateService } from '@app/core';
import { User } from '../models';
import { UsersRepositoryService } from '../repositories';

export class UsersServiceState {
  users: User[];
  selectedUser: User;
}

@Injectable()
export class UsersService extends StateService<UsersServiceState> {
  constructor(private usersRepository: UsersRepositoryService) {
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
