import { Pipe, PipeTransform } from '@angular/core';
import { LocalizationValues, LocalizationService } from '@app/core/services';

@Pipe({
  name: 'localize'
})
export class LocalizePipe implements PipeTransform {
  constructor(private localizationService: LocalizationService) {}

  transform(value: string, args?: any): LocalizationValues | string {
    const values = this.localizationService.values;
    return values ? values : value;
  }
}
