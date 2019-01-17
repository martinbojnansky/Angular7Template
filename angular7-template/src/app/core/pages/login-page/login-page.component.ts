import { Component, OnInit } from '@angular/core';

import { AuthorizationService } from './../../services';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  constructor(private authorizationService: AuthorizationService) {}

  ngOnInit() {}

  signIn() {
    this.authorizationService.signIn();
  }
}
