import { Pipe, PipeTransform } from '@angular/core';
import { ApiRoute, AppRoute, LocalStorageKey } from '@assets/constants';

@Pipe({
  name: 'constants'
})
export class ConstantsPipe implements PipeTransform {
  transform(value: string, args?: any) {
    return {
      apiRoutes: ApiRoute,
      appRoutes: AppRoute,
      localStorageKeys: LocalStorageKey
    };
  }
}
