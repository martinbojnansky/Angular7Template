import { TestBed } from '@angular/core/testing';

import { testModuleDefFactory } from '@app/core/test-doubles';
import { LocalizePipe } from '@app/shared';

describe('LocalizePipe', () => {
  let pipe: LocalizePipe;

  beforeEach(() => {
    TestBed.configureTestingModule(testModuleDefFactory({}));

    pipe = TestBed.get(LocalizePipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
