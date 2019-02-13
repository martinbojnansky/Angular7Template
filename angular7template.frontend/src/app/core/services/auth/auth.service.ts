import { Store } from '../../store';

export class AuthServiceState {
  isAuth: boolean;
  token: string;
}

export abstract class AuthService extends Store<AuthServiceState> {
  abstract signIn(userName: string, password: string): void;
  abstract signOut(): void;
}
