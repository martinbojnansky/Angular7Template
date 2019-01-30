import { LocalStorageService } from '../services';

export const localStorageServiceSpyFactory = () =>
  jasmine.createSpyObj<LocalStorageService>('LocalStorageService', [
    'clear',
    'getItem',
    'key',
    'removeItem',
    'setItem'
  ]);
