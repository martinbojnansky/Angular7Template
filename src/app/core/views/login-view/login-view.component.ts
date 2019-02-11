import { Component, ChangeDetectionStrategy } from '@angular/core';

import { AuthService, StateService } from './../../services';
import { FormControl } from '@angular/forms';

export class LoginViewState {
  userName: FormControl = new FormControl();
  password: FormControl = new FormControl();
  error: string;
}

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginViewComponent extends StateService<LoginViewState> {
  constructor(public authService: AuthService) {
    super(new LoginViewState());
  }

  signIn() {
    try {
      this.authService.signIn(
        this.state.userName.value,
        this.state.password.value
      );
    } catch (e) {
      this.setState({ ...this.state, error: e.message });
    }
  }
}
