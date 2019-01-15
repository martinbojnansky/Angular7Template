import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../../models';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  @Input() user: User;
  @Output() closed: EventEmitter<User> = new EventEmitter<User>();

  constructor() {}

  ngOnInit() {}

  onClose() {
    this.closed.emit(this.user);
  }
}
