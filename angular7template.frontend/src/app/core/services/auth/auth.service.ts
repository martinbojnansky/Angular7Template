import { ViewModel } from '../../mvvm';

export class AuthServiceState {
  isAuth: boolean;
  token: string;
}

export abstract class AuthService extends ViewModel<AuthServiceState> {
  abstract signIn(userName: string, password: string): void;
  abstract signOut(): void;
}
