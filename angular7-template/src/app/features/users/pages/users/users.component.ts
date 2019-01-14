import { Component, OnInit } from '@angular/core';

import { UsersRepositoryService } from '../../services/users-repository.service';
import { User } from '../../models';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public users: User[];
  public selectedUser: User;

  constructor(private usersRepositoryService: UsersRepositoryService) {}

  ngOnInit() {
    this.initUsers();
  }

  onSelectUser(user: User) {
    this.selectedUser = user;
  }

  private initUsers() {
    this.usersRepositoryService.getUsers().subscribe(result => {
      this.users = (<any>result).data;
    });
  }
}
