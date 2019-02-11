import { FakeAuthService } from '@app/core/services';
import {
  localizationServiceSpyFactory,
  localStorageServiceSpyFactory,
  routerSpyFactory
} from '../spies';

export class FakeAuthServiceStub extends FakeAuthService {
  constructor() {
    super(
      localStorageServiceSpyFactory(),
      routerSpyFactory(),
      localizationServiceSpyFactory()
    );
  }
}
