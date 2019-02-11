import { ViewModel } from '../../mvvm';

export class AuthServiceState {
  isAuth: boolean;
  errorText: string;
}

export abstract class AuthService extends ViewModel<AuthServiceState> {
  abstract signIn(userName: string, password: string): Promise<void>;
  abstract signOut(): Promise<void>;
}
