import { StateService } from '../state.service';

export class AuthServiceState {
  isAuth: boolean;
  errorText: string;
}

export abstract class AuthService extends StateService<AuthServiceState> {
  abstract signIn(userName: string, password: string): void;
  abstract signOut(): void;
}
