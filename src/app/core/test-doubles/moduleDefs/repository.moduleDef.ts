import { TestModuleMetadata } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

export const coreRepositoryModuleDefFactory = (): TestModuleMetadata => ({
  imports: [HttpClientTestingModule],
  declarations: [],
  providers: [
    // Repositories
  ],
  schemas: []
});
