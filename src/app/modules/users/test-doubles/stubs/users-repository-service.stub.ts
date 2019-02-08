import { UsersRepositoryService } from '@modules/users/repositories';
import { Observable, of } from 'rxjs';
import { usersFakeFactory } from '@modules/users/test-doubles';

export class UsersRepositoryServiceStub extends UsersRepositoryService {
  constructor() {
    super(null);
  }

  getAll(): Observable<any> {
    return of(usersFakeFactory());
  }
}
