import { TestBed } from '@angular/core/testing';

import { UsersRepository } from './users.repository';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { ApiRoute } from '@assets/constants';
import { usersRepositoryModuleDefFactory } from '@modules/users/test-doubles/moduleDefs';

describe('UsersRepository', () => {
  let service: UsersRepository;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule(usersRepositoryModuleDefFactory());

    service = TestBed.get(UsersRepository);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should call getAll correctly', () => {
    service.getAll().subscribe(() => {});
    httpTestingController.expectOne(
      `${ApiRoute.BASE}/${ApiRoute.API}/${ApiRoute.USERS}`
    );
  });
});
