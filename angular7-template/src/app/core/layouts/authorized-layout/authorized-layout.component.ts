import { Component, OnInit } from '@angular/core';

import { AuthService } from './../../services';

@Component({
  selector: 'app-authorized-layout',
  templateUrl: './authorized-layout.component.html',
  styleUrls: ['./authorized-layout.component.scss']
})
export class AuthorizedLayoutComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  signOut() {
    this.authService.signOut();
  }
}
