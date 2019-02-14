import { TestModuleMetadata } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DefaultLoginRepository, LoginRepository } from '@app/core';

export const coreRepositoryModuleDefFactory = (): TestModuleMetadata => ({
  imports: [HttpClientTestingModule],
  declarations: [],
  providers: [
    // Repositories
    {
      provide: LoginRepository,
      useClass: DefaultLoginRepository
    }
  ],
  schemas: []
});
