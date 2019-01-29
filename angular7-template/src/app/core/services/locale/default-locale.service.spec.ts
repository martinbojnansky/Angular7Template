import { TestBed } from '@angular/core/testing';

import { DefaultLocaleService } from './default-locale.service';

describe('DefaultLocaleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DefaultLocaleService = TestBed.get(DefaultLocaleService);
    expect(service).toBeTruthy();
  });
});
