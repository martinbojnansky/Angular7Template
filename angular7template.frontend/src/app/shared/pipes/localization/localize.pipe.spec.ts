import { TestBed } from '@angular/core/testing';

import { LocalizePipe } from '@app/shared';
import { sharedTestModuleDefFactory } from '@app/shared/test-doubles';

describe('LocalizePipe', () => {
  let pipe: LocalizePipe;

  beforeEach(() => {
    TestBed.configureTestingModule(sharedTestModuleDefFactory());

    pipe = TestBed.get(LocalizePipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
