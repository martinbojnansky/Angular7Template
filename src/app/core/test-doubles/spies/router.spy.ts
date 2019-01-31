export const routerSpyFactory = () =>
  jasmine.createSpyObj('Router', ['navigate']);
