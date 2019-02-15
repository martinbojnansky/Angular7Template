import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { LocalStorageKey, AppRoute } from '@assets/constants';
import { LocalStorageService } from '../storage';
import { AuthService, AuthServiceState } from './auth.service';
import { LocalizationService } from '../localization';
import { LoginRepository } from '../../repositories';

@Injectable()
export class DefaultAuthService extends AuthService {
  constructor(
    private loginRepositoryService: LoginRepository,
    private localStorageService: LocalStorageService,
    private router: Router,
    private localizationService: LocalizationService
  ) {
    super(new AuthServiceState());
    this.init();
  }

  signIn(userName: string, password: string): void {
    this.loginRepositoryService
      .login(userName, password)
      .subscribe(
        token => this.signInCompleted(token),
        e => this.signInFailed()
      );
  }

  signOut(): void {
    this.localStorageService.removeItem(LocalStorageKey.AUTH_TOKEN);
    this.setState({ ...this.state, isAuth: false, token: null });
    this.router.navigate([AppRoute.LOGIN]);
  }

  protected init(): void {
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

  protected signInCompleted(token: string): void {
    this.localStorageService.setItem(LocalStorageKey.AUTH_TOKEN, token);
    this.setState({ ...this.state, isAuth: true, token: token, error: null });
    this.router.navigate([AppRoute.AUTH]);
  }

  protected signInFailed() {
    this.setState({
      ...this.state,
      error: this.localizationService.values.invalidCredentialsError
    });
  }
}
