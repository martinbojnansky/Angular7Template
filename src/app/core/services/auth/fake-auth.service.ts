import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { LocalStorageKey, AppRoute } from '@assets/constants';
import { LocalStorageService } from '../storage';
import { AuthService, AuthServiceState } from './auth.service';
import { LocalizationService } from '../localization';

@Injectable()
export class FakeAuthService extends AuthService {
  private authToken: string;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private localizationService: LocalizationService
  ) {
    super(new AuthServiceState());
    this.init();
  }

  async signIn(userName: string, password: string): Promise<void> {
    if (userName === 'user' && password === 'password') {
      this.authToken = 'authToken123456789';
      this.localStorageService.setItem(
        LocalStorageKey.AUTHORIZATION_TOKEN,
        this.authToken
      );
      this.setState({ ...this.state, isAuth: true });
      await this.router.navigate([AppRoute.AUTH]);
    } else {
      throw new Error(this.localizationService.values.invalidCredentialsError);
    }
  }

  async signOut(): Promise<void> {
    this.localStorageService.removeItem(LocalStorageKey.AUTHORIZATION_TOKEN);
    this.authToken = null;
    this.setState({ ...this.state, isAuth: false });
    await this.router.navigate([AppRoute.LOGIN]);
  }

  private init(): void {
    this.authToken = this.localStorageService.getItem(
      LocalStorageKey.AUTHORIZATION_TOKEN
    );
    this.setState({ ...this.state, isAuth: !!this.authToken });
  }
}

export default FakeAuthService;
