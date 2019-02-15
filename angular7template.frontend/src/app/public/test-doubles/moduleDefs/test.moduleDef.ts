import { TestModuleMetadata } from '@angular/core/testing';

import { CoreTestModuleDefOptions } from '@app/core/test-doubles';
import { sharedTestModuleDefFactory } from '@app/shared/test-doubles';
import { LoginViewComponent, NotFoundViewComponent } from '@app/public/views';

export const publicTestModuleDefFactory = (
  options?: CoreTestModuleDefOptions
): TestModuleMetadata => {
  const sharedTestModuleDef = sharedTestModuleDefFactory(options);

  return {
    imports: [...sharedTestModuleDef.imports],
    declarations: [
      ...sharedTestModuleDef.declarations,
      // Views
      NotFoundViewComponent,
      LoginViewComponent
    ],
    providers: [...sharedTestModuleDef.providers],
    schemas: [sharedTestModuleDef.schemas]
  };
};
