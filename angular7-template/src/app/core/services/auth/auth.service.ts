export abstract class AuthService {
  abstract isAuth(): boolean;
  abstract signIn(): void;
  abstract signOut(): void;
}
