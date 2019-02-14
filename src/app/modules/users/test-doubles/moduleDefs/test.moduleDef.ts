import { TestModuleMetadata } from '@angular/core/testing';

import {
  coreTestModuleDefFactory,
  CoreTestModuleDefOptions
} from '@app/core/test-doubles';
import { UsersViewComponent } from '@modules/users/views';
import {
  UserDetailComponent,
  UserNameComponent
} from '@modules/users/components';
import { UsersService } from '@modules/users/services';
import { UsersRepository } from '@modules/users/repositories';
import { UsersRepositoryStub } from '@modules/users/test-doubles';

export const usersTestModuleDefFactory = (
  options?: CoreTestModuleDefOptions
): TestModuleMetadata => {
  const coreTestModuleDef = coreTestModuleDefFactory(options);

  return {
    imports: [...coreTestModuleDef.imports],
    declarations: [
      ...coreTestModuleDef.declarations,
      // Components
      UserDetailComponent,
      UserNameComponent,
      // Views
      UsersViewComponent
    ],
    providers: [
      ...coreTestModuleDef.providers,
      // Services
      UsersService,
      // Repositories
      {
        provide: UsersRepository,
        useClass: UsersRepositoryStub
      }
    ],
    schemas: [coreTestModuleDef.schemas]
  };
};
