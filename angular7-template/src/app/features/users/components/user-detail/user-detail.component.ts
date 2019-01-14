import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  @Input() public user: User;

  constructor() {}

  ngOnInit() {}
}
