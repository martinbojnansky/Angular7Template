import { TestModuleMetadata } from '@angular/core/testing';

import { CoreTestModuleDefOptions } from '@app/core/test-doubles';
import { sharedTestModuleDefFactory } from '@app/shared/test-doubles';
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
  const sharedTestModuleDef = sharedTestModuleDefFactory(options);

  return {
    imports: [...sharedTestModuleDef.imports],
    declarations: [
      ...sharedTestModuleDef.declarations,
      // Components
      UserDetailComponent,
      UserNameComponent,
      // Views
      UsersViewComponent
    ],
    providers: [
      ...sharedTestModuleDef.providers,
      // Services
      UsersService,
      // Repositories
      {
        provide: UsersRepository,
        useClass: UsersRepositoryStub
      }
    ],
    schemas: [sharedTestModuleDef.schemas]
  };
};
