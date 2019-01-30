import { TestBed } from '@angular/core/testing';

import { DefaultLocalizationService } from './default-localization.service';

describe('DefaultLocalizationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DefaultLocalizationService = TestBed.get(
      DefaultLocalizationService
    );
    expect(service).toBeTruthy();
  });
});
