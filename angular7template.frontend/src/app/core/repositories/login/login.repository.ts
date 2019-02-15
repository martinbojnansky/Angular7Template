import { Observable } from 'rxjs';

export abstract class LoginRepository {
  abstract login(userName: string, password: string): Observable<string>;
}
