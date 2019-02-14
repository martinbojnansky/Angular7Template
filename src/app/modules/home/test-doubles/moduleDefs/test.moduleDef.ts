import { TestModuleMetadata } from '@angular/core/testing';

import {
  coreTestModuleDefFactory,
  CoreTestModuleDefOptions
} from '@app/core/test-doubles';
import { HomeViewComponent } from '@modules/home/views';

export const homeTestModuleDefFactory = (
  options?: CoreTestModuleDefOptions
): TestModuleMetadata => {
  const coreTestModuleDef = coreTestModuleDefFactory(options);

  return {
    imports: [...coreTestModuleDef.imports],
    declarations: [
      ...coreTestModuleDef.declarations,
      // Views
      HomeViewComponent
    ],
    providers: [...coreTestModuleDef.providers],
    schemas: [coreTestModuleDef.schemas]
  };
};
