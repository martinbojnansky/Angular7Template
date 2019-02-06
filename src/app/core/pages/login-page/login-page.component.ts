import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AuthService } from './../../services';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {
  constructor(public authService: AuthService) {}
}
