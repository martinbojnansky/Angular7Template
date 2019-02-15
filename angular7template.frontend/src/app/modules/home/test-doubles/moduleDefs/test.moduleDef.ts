import { TestModuleMetadata } from '@angular/core/testing';

import { CoreTestModuleDefOptions } from '@app/core/test-doubles';
import { sharedTestModuleDefFactory } from '@app/shared/test-doubles';
import { HomeViewComponent } from '@modules/home/views';

export const homeTestModuleDefFactory = (
  options?: CoreTestModuleDefOptions
): TestModuleMetadata => {
  const sharedTestModuleDef = sharedTestModuleDefFactory(options);

  return {
    imports: [...sharedTestModuleDef.imports],
    declarations: [
      ...sharedTestModuleDef.declarations,
      // Views
      HomeViewComponent
    ],
    providers: [...sharedTestModuleDef.providers],
    schemas: [sharedTestModuleDef.schemas]
  };
};
