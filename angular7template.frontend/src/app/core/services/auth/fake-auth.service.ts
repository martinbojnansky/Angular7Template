import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { LocalStorageKey, AppRoute } from '@assets/constants';
import { AuthService, AuthServiceState } from './auth.service';
import { LocalStorageService } from '../storage';
import { LocalizationService } from '../localization';

@Injectable()
export class FakeAuthService extends AuthService {
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private localizationService: LocalizationService
  ) {
    super(new AuthServiceState());
    this.init();
  }

  signIn(userName: string, password: string): void {
    if (userName === 'user' && password === 'password') {
      const authToken = 'authToken123456789';
      this.localStorageService.setItem(LocalStorageKey.AUTH_TOKEN, authToken);
      this.setState({ ...this.state, isAuth: true, token: authToken });
      this.router.navigate([AppRoute.AUTH]);
    } else {
      this.setState({
        ...this.state,
        error: this.localizationService.values.invalidCredentialsError
      });
    }
  }

  signOut(): void {
    this.localStorageService.removeItem(LocalStorageKey.AUTH_TOKEN);
    this.setState({ ...this.state, isAuth: false, token: null, error: null });
    this.router.navigate([AppRoute.LOGIN]);
  }

  private init(): void {
    const authToken = this.localStorageService.getItem(
      LocalStorageKey.AUTH_TOKEN
    );
    this.setState({
      ...this.state,
      isAuth: !!authToken,
      token: authToken,
      error: null
    });
  }
}
