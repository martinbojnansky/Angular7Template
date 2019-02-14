import { TestModuleMetadata } from '@angular/core/testing';
import { coreRepositoryModuleDefFactory } from '@app/core/test-doubles';
import { UsersRepository } from '@modules/users/repositories';

export const usersRepositoryModuleDefFactory = (): TestModuleMetadata => {
  const coreRepositoryModuleDef = coreRepositoryModuleDefFactory();

  return {
    imports: [...coreRepositoryModuleDef.imports],
    declarations: [...coreRepositoryModuleDef.declarations],
    providers: [...coreRepositoryModuleDef.providers, UsersRepository],
    schemas: [coreRepositoryModuleDef.schemas]
  };
};
