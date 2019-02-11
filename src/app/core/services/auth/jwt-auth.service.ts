import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { LocalStorageKey, AppRoute } from '../../../../assets/constants';
import { LocalStorageService } from '../storage';
import { AuthService, AuthServiceState } from './auth.service';
import { LocalizationService } from '../localization';

@Injectable()
export class JwtAuthService extends AuthService {
  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router,
    private localizationService: LocalizationService
  ) {
    super(new AuthServiceState());
    this.init();
  }

  signIn(userName: string, password: string): void {
    const formData: FormData = new FormData();
    formData.append('username', userName);
    formData.append('password', password);

    this.httpClient.post('login', formData).subscribe(
      async (token: string) => {
        this.localStorageService.setItem(LocalStorageKey.AUTH_TOKEN, token);
        this.setState({ ...this.state, isAuth: true, token: token });
        await this.router.navigate([AppRoute.AUTH]);
      },
      () => {
        throw new Error(
          this.localizationService.values.invalidCredentialsError
        );
      }
    );
  }

  signOut(): void {
    this.httpClient.post(AppRoute.LOGOUT, null).subscribe(async () => {
      this.localStorageService.removeItem(LocalStorageKey.AUTH_TOKEN);
      this.setState({ ...this.state, isAuth: false, token: null });
      await this.router.navigate([AppRoute.LOGIN]);
    });
  }

  private init(): void {
    const authToken = this.localStorageService.getItem(
      LocalStorageKey.AUTH_TOKEN
    );
    this.setState({ ...this.state, isAuth: !!authToken });
  }
}
