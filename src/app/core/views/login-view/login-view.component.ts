import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Store } from '../../store';
import { AuthService } from '../../services';

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
export class LoginViewComponent extends Store<LoginViewState> {
  constructor(private authService: AuthService) {
    super(new LoginViewState());
  }

  signIn(): void {
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
