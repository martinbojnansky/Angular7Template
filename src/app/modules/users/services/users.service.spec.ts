import { TestBed } from '@angular/core/testing';

import {
  userFakeFactory,
  UsersRepositoryStub
} from '@modules/users/test-doubles';
import { User } from '@modules/users/models';
import { UsersService } from '@modules/users/services';
import { UsersRepository } from '@modules/users/repositories';
import { usersTestModuleDefFactory } from '@modules/users/test-doubles/moduleDefs';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule(usersTestModuleDefFactory());

    service = TestBed.get(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetchUsers correctly', () => {
    expect(service.state.users).toBe(undefined);
    service.fetchUsers();
    expect(service.state.users.length).toBe(3);
  });

  it('should set selected user', () => {
    const user: User = userFakeFactory();
    service.selectUser(user);
    expect(service.state.selectedUser).toBe(user);
  });
});
