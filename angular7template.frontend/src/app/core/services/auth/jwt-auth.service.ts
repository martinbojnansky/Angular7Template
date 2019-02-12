import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { LocalStorageKey, AppRoute, ApiRoute } from '@assets/constants';
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

  async signIn(userName: string, password: string): Promise<void> {
    const formData: FormData = new FormData();
    formData.append('username', userName);
    formData.append('password', password);

    await this.httpClient
      .post(`${ApiRoute.BASE}/${ApiRoute.LOGIN}`, formData, {
        responseType: 'text'
      })
      .subscribe(
        async (token: string) => {
          this.localStorageService.setItem(LocalStorageKey.AUTH_TOKEN, token);
          this.setState({ ...this.state, isAuth: true, token: token });
          await this.router.navigate([AppRoute.AUTH]);
        },
        e => {
          throw new Error(
            this.localizationService.values.invalidCredentialsError
          );
        }
      );
  }

  async signOut(): Promise<void> {
      this.localStorageService.removeItem(LocalStorageKey.AUTH_TOKEN);
      this.setState({ ...this.state, isAuth: false, token: null });
      await this.router.navigate([AppRoute.LOGIN]);
  }

  private init(): void {
    const authToken = this.localStorageService.getItem(
      LocalStorageKey.AUTH_TOKEN
    );
    this.setState({ ...this.state, isAuth: !!authToken });
  }
}
