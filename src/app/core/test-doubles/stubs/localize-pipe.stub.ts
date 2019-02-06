import {LocalizePipe} from '@app/shared';
import {LocalizationServiceFake } from '../fakes';

export class LocalizePipeStub extends LocalizePipe {
  constructor() {
    super(new LocalizationServiceFake());
  }
}
