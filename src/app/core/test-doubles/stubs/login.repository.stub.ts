import { Observable, of } from 'rxjs';

import { DefaultLoginRepository } from '@app/core/repositories';
import { authInfoFakeFactory } from '../fakes';

const authInfo = authInfoFakeFactory();

export class LoginRepositoryStub extends DefaultLoginRepository {
  login(userName: string, password: string): Observable<string> {
    if (userName === authInfo.userName && password === authInfo.password) {
      return of(authInfo.token);
    } else {
      throw new Error();
    }
  }
}
