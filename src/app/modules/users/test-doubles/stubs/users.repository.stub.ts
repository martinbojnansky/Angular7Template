import { UsersRepository } from '@modules/users/repositories';
import { Observable, of } from 'rxjs';
import { usersFakeFactory } from '@modules/users/test-doubles';

export class UsersRepositoryStub extends UsersRepository {
  constructor() {
    super(null);
  }

  getAll(): Observable<any> {
    return of(usersFakeFactory());
  }
}
