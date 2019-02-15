import { Observable, of } from 'rxjs';

import { DefaultLoginRepository } from '@app/core/repositories';
import { authInfoFakeFactory } from '../fakes';

const authInfo = authInfoFakeFactory();

export class LoginRepositoryStub extends DefaultLoginRepository {
  login(userName: string, password: string): Observable<string> {
    return Observable.create(observer => {
      if (userName === authInfo.userName && password === authInfo.password) {
        observer.next(authInfo.token);
      } else {
        observer.error();
      }
      observer.complete();
    });
  }
}
