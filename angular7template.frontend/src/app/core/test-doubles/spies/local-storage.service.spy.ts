import { LocalStorageService } from '@app/core/services';

export interface LocalStorageValues {
  [id: string]: string;
}

export const localStorageServiceSpyFactory = (
  values: LocalStorageValues = {}
) => {
  const storage: LocalStorageValues = values;

  const spy = jasmine.createSpyObj<LocalStorageService>('LocalStorageService', [
    'clear',
    'getItem',
    'key',
    'removeItem',
    'setItem'
  ]);

  spy.getItem.and.callFake((key: string) => {
    return key in storage ? storage[key] : null;
  });

  spy.setItem.and.callFake((key: string, value: string) => {
    storage[key] = value || '';
  });

  spy.removeItem.and.callFake((key: string) => {
    delete storage[key];
  });

  spy.key.and.callFake((index: number) => {
    return Object.keys(storage)[index] || null;
  });

  return spy;
};
