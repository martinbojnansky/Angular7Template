import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginViewComponent } from './login-view.component';
import { AuthService } from '@app/core';
import {
  authInfoFakeFactory,
  testModuleDefFactory
} from '@app/core/test-doubles';

describe('LoginViewComponent', () => {
  let component: LoginViewComponent;
  let fixture: ComponentFixture<LoginViewComponent>;
  let compiled: any;
  let authService: AuthService;
  let userNameField: any;
  let passwordField: any;
  let submitButton: any;

  const authInfo = authInfoFakeFactory();

  beforeEach(async(() => {
    TestBed.configureTestingModule(
      testModuleDefFactory({})
    ).compileComponents();

    authService = TestBed.get(AuthService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    userNameField = compiled.querySelector('input[type=text]');
    passwordField = compiled.querySelector('input[type=password]');
    submitButton = compiled.querySelector('input[type=submit]');
  });

  const login = (userName: string, password: string) => {
    userNameField.value = userName;
    userNameField.dispatchEvent(new Event('input'));
    passwordField.value = password;
    passwordField.dispatchEvent(new Event('input'));
    submitButton.click();
    fixture.detectChanges();
  };

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Integration test
  it('should auth user on submit button click', () => {
    login(authInfo.userName, authInfo.password);

    expect(authService.state.isAuth).toBeTruthy();
    expect(compiled.querySelector('.error')).toBeNull();
  });

  // Isolated test
  it('should call auth service on submit button click', () => {
    const signInSpy = spyOn(authService, 'signIn');

    login(authInfo.userName, authInfo.password);

    expect(signInSpy).toHaveBeenCalledWith(
      authInfo.userName,
      authInfo.password
    );
    expect(compiled.querySelector('.error')).toBeNull();
  });

  // Integrated tested
  it('should not auth user on submit button click', () => {
    login(authInfo.userName, '');

    expect(authService.state.isAuth).toBeFalsy();
    expect(compiled.querySelector('.error').textContent).toBeTruthy();
  });

  // Isolated test
  it('should call auth service on submit button click', () => {
    const errorMessage = 'Error message.';
    const signInSpy = spyOn(authService, 'signIn').and.throwError(errorMessage);

    login(authInfo.userName, '');

    expect(signInSpy).toHaveBeenCalledWith(authInfo.userName, '');
    expect(compiled.querySelector('.error').textContent).toEqual(errorMessage);
  });
});
