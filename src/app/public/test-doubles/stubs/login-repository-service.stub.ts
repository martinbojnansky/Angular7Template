import { Observable, of } from 'rxjs';

import { DefaultLoginRepository } from '@app/public';
import { authInfoFakeFactory } from '@app/core/test-doubles';

const authInfo = authInfoFakeFactory();

export class LoginRepositoryServiceStub extends DefaultLoginRepository {
  login(userName: string, password: string): Observable<string> {
    if (userName === authInfo.userName && password === authInfo.password) {
      return of(authInfo.token);
    } else {
      throw new Error();
    }
  }
}
