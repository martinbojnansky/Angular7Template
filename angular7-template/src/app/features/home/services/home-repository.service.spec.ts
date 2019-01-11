import { TestBed } from '@angular/core/testing';

import { HomeRepositoryService } from './home-repository.service';

describe('HomeRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomeRepositoryService = TestBed.get(HomeRepositoryService);
    expect(service).toBeTruthy();
  });
});
