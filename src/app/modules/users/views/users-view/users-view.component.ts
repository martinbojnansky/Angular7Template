import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { UsersService } from '../../services';

@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class UsersViewComponent implements OnInit {
  constructor(public usersService: UsersService) {}

  ngOnInit() {
    this.usersService.fetchUsers();
  }
}
