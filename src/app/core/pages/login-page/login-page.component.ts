import { Component, OnInit } from '@angular/core';

import { AuthService, LocalizationService } from './../../services';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  constructor(
    public localizationService: LocalizationService,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  signIn() {
    this.authService.signIn();
  }
}
