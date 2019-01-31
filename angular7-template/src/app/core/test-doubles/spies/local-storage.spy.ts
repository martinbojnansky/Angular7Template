export const localStorageSpyFactory = () => {
  const spy = jasmine.createSpyObj<Storage>('localStorage', [
    'clear',
    'getItem',
    'key',
    'removeItem',
    'setItem',
    'length'
  ]);
  spy.clear.and.callFake(() => {});
  spy.getItem.and.callFake(() => 'value');

  spy.key.and.callFake(() => 'key');

  spy.removeItem.and.callFake(() => {});

  spy.setItem.and.callFake(() => {});

  return spy;
};
