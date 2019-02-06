import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { UsersService } from '../../services';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class UsersPageComponent implements OnInit {
  constructor(public usersService: UsersService) {}

  ngOnInit() {
    this.usersService.fetchUsers();
  }
}
