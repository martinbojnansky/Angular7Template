import { AuthService } from '@app/core/services';

export const authServiceSpyFactory = () => {
  const spy = jasmine.createSpyObj<AuthService>('AuthService', [
    'signIn',
    'signOut'
  ]);

  return spy;
};
