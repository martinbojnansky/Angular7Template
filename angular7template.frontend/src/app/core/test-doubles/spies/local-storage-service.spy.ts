import { LocalStorageService } from '@app/core/services';

export const localStorageServiceSpyFactory = () => {
  const spy = jasmine.createSpyObj<LocalStorageService>('LocalStorageService', [
    'clear',
    'getItem',
    'key',
    'removeItem',
    'setItem'
  ]);

  return spy;
};
