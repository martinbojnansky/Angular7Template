import { Component, OnInit, Input, DoCheck } from '@angular/core';

import { User } from '../../models';

@Component({
  selector: 'app-user-name',
  templateUrl: './user-name.component.html',
  styleUrls: ['./user-name.component.scss']
})
export class UserNameComponent implements OnInit, DoCheck {
  @Input() user: User;

  constructor() {}

  ngOnInit() {}

  ngDoCheck() {
    console.log('app-user-name component doCheck()');
  }
}
