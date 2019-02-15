import { TestModuleMetadata } from '@angular/core/testing';

import { CoreTestModuleDefOptions } from '@app/core/test-doubles';
import { sharedTestModuleDefFactory } from '@app/shared/test-doubles';
import { AuthorizedViewComponent } from '@app/auth';

export const authTestModuleDefFactory = (
  options?: CoreTestModuleDefOptions
): TestModuleMetadata => {
  const sharedTestModuleDef = sharedTestModuleDefFactory(options);

  return {
    imports: [...sharedTestModuleDef.imports],
    declarations: [
      ...sharedTestModuleDef.declarations,
      // Views
      AuthorizedViewComponent
    ],
    providers: [...sharedTestModuleDef.providers],
    schemas: [sharedTestModuleDef.schemas]
  };
};
