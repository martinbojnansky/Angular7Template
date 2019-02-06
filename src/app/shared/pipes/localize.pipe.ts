import { Pipe, PipeTransform } from '@angular/core';
import { LocalizationValues, LocalizationService } from '@app/core/services';

@Pipe({
  name: 'localize'
})
export class LocalizePipe implements PipeTransform {
  constructor(private localizationService: LocalizationService) {}

  transform(value: string, args?: any): LocalizationValues {
    return this.localizationService.values;
  }
}
