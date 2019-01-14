import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersRepositoryService } from '../../services';
import { User } from '../../models';

@Injectable()
export class UsersRepositoryServiceMock extends UsersRepositoryService {
  getUsers(): Observable<User> {
    return new Observable(<any>{
      data: [
        {
          id: 1,
          first_name: 'George',
          last_name: 'Bluth',
          avatar:
            'https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg'
        }
      ]
    });
  }
}
