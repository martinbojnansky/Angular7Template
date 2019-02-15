import { TestModuleMetadata } from '@angular/core/testing';
import { coreRepositoryModuleDefFactory } from '@app/core/test-doubles';

export const publicRepositoryModuleDefFactory = (): TestModuleMetadata => {
  const coreRepositoryModuleDef = coreRepositoryModuleDefFactory();

  return {
    imports: [...coreRepositoryModuleDef.imports],
    declarations: [...coreRepositoryModuleDef.declarations],
    providers: [...coreRepositoryModuleDef.providers],
    schemas: [coreRepositoryModuleDef.schemas]
  };
};
