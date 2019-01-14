import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { HomeRepositoryService } from './home-repository.service';

describe('HomeRepositoryService', () => {
  let homeRepositoryService: HomeRepositoryService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HomeRepositoryService]
    });

    homeRepositoryService = TestBed.get(HomeRepositoryService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(homeRepositoryService).toBeTruthy();
  });

  it('should call getUsers with correct url', () => {
    homeRepositoryService.getUsers().subscribe(() => {});
    httpTestingController.expectOne('https://reqres.in/api/users').flush({});
  });
});
