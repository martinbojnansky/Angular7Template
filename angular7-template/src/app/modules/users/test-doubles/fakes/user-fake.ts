import { User } from '../../models';

export const userFakeFactory = (): User => ({
  id: 1,
  first_name: 'fn',
  last_name: 'ln',
  avatar: 'av'
});
