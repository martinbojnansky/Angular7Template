import { Component, OnInit } from '@angular/core';

import { UsersRepositoryService } from '../../services/users-repository.service';
import { User } from '../../models';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[];
  selectedUser: User;

  private usersOrderByProp: string;
  private usersOrderByDesc: boolean;

  constructor(private usersRepositoryService: UsersRepositoryService) {}

  ngOnInit() {
    this.initUsers();
  }

  onSelectUser(user: User) {
    this.selectedUser = user;
  }

  onUnselectUser(user: User) {
    if (this.selectedUser === user) {
      this.selectedUser = null;
    }
  }

  orderBy(prop: string) {
    if (this.usersOrderByProp === prop) {
      this.usersOrderByDesc = !this.usersOrderByDesc;
    } else {
      this.usersOrderByProp = prop;
      this.usersOrderByDesc = false;
    }

    this.orderUsers();
  }

  private initUsers() {
    this.usersRepositoryService.getUsers().subscribe(result => {
      this.users = (<any>result).data;
    });
  }

  private orderUsers() {
    let sortedUsers: User[] = Object.assign([], this.users);
    sortedUsers = sortedUsers.sort((a, b) => {
      return a[this.usersOrderByProp] > b[this.usersOrderByProp] ? 1 : -1;
    });

    this.users = sortedUsers;
  }
}
