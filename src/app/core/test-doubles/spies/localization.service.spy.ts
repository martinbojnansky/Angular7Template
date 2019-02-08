import { LocalizationService } from '@app/core';

export const localizationServiceSpyFactory = () => {
  return jasmine.createSpyObj<LocalizationService>('LocalizationService', [
    'changeLocale'
  ]);
};
