import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HomeRepositoryService } from '../../services';

@Injectable()
export class HomeRepositoryMockService extends HomeRepositoryService {
  getUsers(): Observable<Object> {
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
