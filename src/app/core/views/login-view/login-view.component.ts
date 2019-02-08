import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AuthService } from './../../services';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginViewComponent {
  constructor(public authService: AuthService) {}
}
