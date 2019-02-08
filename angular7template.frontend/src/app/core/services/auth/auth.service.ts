import { StoreService } from '../store.service';

export class AuthServiceState {
  isAuth: boolean;
}

export abstract class AuthService extends StoreService<AuthServiceState> {
  abstract signIn(): void;
  abstract signOut(): void;
}
