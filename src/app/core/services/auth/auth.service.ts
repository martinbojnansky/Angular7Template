import { StateService } from '../state.service';

export class AuthServiceState {
  isAuth: boolean;
  errorText: string;
}

export abstract class AuthService extends StateService<AuthServiceState> {
  abstract signIn(userName: string, password: string): Promise<void>;
  abstract signOut(): Promise<void>;
}
