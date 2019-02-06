import { TestBed } from '@angular/core/testing';

import { LocalizationService } from '@app/core/services';
import { localizationServiceSpyFactory } from '@app/core/test-doubles';
import { LocalizePipe } from '@app/shared';

describe('LocalizePipe', () => {
  let pipe: LocalizePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LocalizePipe,
        {
          provide: LocalizationService,
          useFactory: localizationServiceSpyFactory
        }
      ]
    });

    pipe = TestBed.get(LocalizePipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
