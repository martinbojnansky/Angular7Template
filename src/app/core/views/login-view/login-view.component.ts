import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AuthService } from './../../services';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginViewComponent {
  public userName: FormControl = new FormControl();
  public password: FormControl = new FormControl();
  public error: string;

  constructor(public authService: AuthService) {}

  signIn() {
    try {
      this.authService.signIn(this.userName.value, this.password.value);
    } catch (e) {
      this.error = e.message;
    }
  }
}
