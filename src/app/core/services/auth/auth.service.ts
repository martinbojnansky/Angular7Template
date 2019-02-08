import { StateService } from '../state.service';

export class AuthServiceState {
  isAuth: boolean;
}

export abstract class AuthService extends StateService<AuthServiceState> {
  abstract signIn(): void;
  abstract signOut(): void;
}
