import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';

import { ApiRoute } from '../../../../assets/constants';
import { LoginRepository } from './login.repository';
import {
  authInfoFakeFactory,
  coreRepositoryModuleDefFactory
} from '../../test-doubles';

describe('LoginRepository', () => {
  let repository: LoginRepository;
  let httpTestingController: HttpTestingController;
  const authInfo = authInfoFakeFactory();

  beforeEach(() => {
    TestBed.configureTestingModule(coreRepositoryModuleDefFactory());

    repository = TestBed.get(LoginRepository);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should call login correctly', () => {
    repository.login(authInfo.userName, authInfo.password).subscribe(() => {});
    const httpRequest = httpTestingController.expectOne(
      `${ApiRoute.BASE}/${ApiRoute.LOGIN}`
    );

    const formData = <FormData>httpRequest.request.body;
    expect(formData.get('username')).toBe(authInfo.userName);
    expect(formData.get('password')).toBe(authInfo.password);
  });
});
