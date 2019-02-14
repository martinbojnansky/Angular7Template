import { TestModuleMetadata } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DefaultLoginRepository, LoginRepository } from '@app/core';

export const repositoryModuleDefFactory = (): TestModuleMetadata => ({
  imports: [HttpClientTestingModule],
  providers: [
    // Repositories
    {
      provide: LoginRepository,
      useClass: DefaultLoginRepository
    }
  ]
});
