import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginViewComponent } from './login-view.component';
import { AuthService } from '@app/core';
import {
  LocalizePipeStub,
  authServiceSpyFactory,
  authInfoFakeFactory
} from '@app/core/test-doubles';

describe('LoginViewComponent', () => {
  let component: LoginViewComponent;
  let fixture: ComponentFixture<LoginViewComponent>;
  let compiled: any;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let userNameField: any;
  let passwordField: any;
  let submitButton: any;

  const authInfo = authInfoFakeFactory();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginViewComponent, LocalizePipeStub],
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        {
          provide: AuthService,
          useFactory: authServiceSpyFactory
        }
      ]
    }).compileComponents();

    authServiceSpy = TestBed.get(AuthService);
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authorization service on sign in', () => {
    userNameField.value = authInfo.userName;
    userNameField.dispatchEvent(new Event('input'));
    passwordField.value = authInfo.password;
    passwordField.dispatchEvent(new Event('input'));
    submitButton.click();
    fixture.detectChanges();

    expect(authServiceSpy.signIn).toHaveBeenCalledWith(
      authInfo.userName,
      authInfo.password
    );
    expect(compiled.querySelector('.error')).toBeNull();
  });

  it('should display error on sign in', () => {
    const errorMessage = 'Error message.';
    authServiceSpy.signIn.and.throwError(errorMessage);

    userNameField.value = authInfo.password;
    userNameField.dispatchEvent(new Event('input'));
    passwordField.value = authInfo.userName;
    passwordField.dispatchEvent(new Event('input'));
    submitButton.click();
    fixture.detectChanges();

    expect(authServiceSpy.signIn).toHaveBeenCalledWith(
      authInfo.password,
      authInfo.userName
    );
    expect(compiled.querySelector('.error').textContent).toBe(errorMessage);
  });
});
