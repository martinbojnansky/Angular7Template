import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { UsersRepositoryService } from './users-repository.service';

describe('UsersRepositoryService', () => {
  let usersRepositoryService: UsersRepositoryService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersRepositoryService]
    });

    usersRepositoryService = TestBed.get(UsersRepositoryService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(usersRepositoryService).toBeTruthy();
  });

  it('should call getUsers with correct url', () => {
    usersRepositoryService.getUsers().subscribe(() => {});
    httpTestingController.expectOne('https://reqres.in/api/users').flush({});
  });
});
