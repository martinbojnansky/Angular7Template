import { FakeAuthService } from '@app/core/services';
import { localStorageServiceSpyFactory, routerSpyFactory } from '../spies';

export class FakeAuthServiceStub extends FakeAuthService {
    constructor() {
        super(localStorageServiceSpyFactory(), routerSpyFactory());
    }
}
