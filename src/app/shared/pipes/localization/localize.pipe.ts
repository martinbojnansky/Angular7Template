import { Pipe, PipeTransform } from '@angular/core';

import { LocalizationService } from '@app/core/services/localization';
import { LocalizationValues } from '@assets/localization';

@Pipe({
  name: 'localize'
})
export class LocalizePipe implements PipeTransform {
  constructor(private localizationService: LocalizationService) {}

  transform(value: string, args?: any): LocalizationValues {
    return this.localizationService.values;
  }
}
