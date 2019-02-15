import { TestModuleMetadata } from '@angular/core/testing';
import {
  coreTestModuleDefFactory,
  CoreTestModuleDefOptions
} from '@app/core/test-doubles';
import { ConstantsPipe, LocalizePipe } from '@app/shared';

export const sharedTestModuleDefFactory = (
  options?: CoreTestModuleDefOptions
): TestModuleMetadata => {
  const coreTestModuleDef = coreTestModuleDefFactory(options);

  return {
    imports: [...coreTestModuleDef.imports],
    declarations: [
      ...coreTestModuleDef.declarations,
      // Pipes
      ConstantsPipe,
      LocalizePipe
    ],
    providers: [
      ...coreTestModuleDef.providers,
      // Pipes
      LocalizePipe
    ],
    schemas: [...coreTestModuleDef.schemas]
  };
};
