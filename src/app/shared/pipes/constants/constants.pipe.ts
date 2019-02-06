import { Pipe, PipeTransform } from '@angular/core';
import { ApiRoutes, AppRoutes, LocalStorageKeys } from '@assets/constants';

@Pipe({
  name: 'constants'
})
export class ConstantsPipe implements PipeTransform {
  transform(value: string, args?: any): any {
    return {
      apiRoutes: ApiRoutes,
      appRoutes: AppRoutes,
      localStorageKeys: LocalStorageKeys
    };
  }
}
