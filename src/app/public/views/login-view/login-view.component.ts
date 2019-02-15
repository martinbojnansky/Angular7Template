import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AuthService, Store } from '@app/core';

export class LoginViewState {
  userName: FormControl = new FormControl();
  password: FormControl = new FormControl();
}

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginViewComponent extends Store<LoginViewState> {
  constructor(public authService: AuthService) {
    super(new LoginViewState());
  }

  signIn(): void {
    this.authService.signIn(
      this.state.userName.value,
      this.state.password.value
    );
  }
}
