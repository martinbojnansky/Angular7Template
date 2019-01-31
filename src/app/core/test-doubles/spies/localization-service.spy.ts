import { LocalizationService, Locale } from '@app/core/services';
import { en } from '@assets/locales/en';

export const localizationServiceSpyFactory = () => {
  const spy = jasmine.createSpyObj<LocalizationService>('LocalizationService', [
    'getLocale',
    'getValues',
    'changeLocale'
  ]);

  spy.getLocale.and.callFake(() => Locale.EN);
  spy.getValues.and.callFake(() => en);

  return spy;
};
