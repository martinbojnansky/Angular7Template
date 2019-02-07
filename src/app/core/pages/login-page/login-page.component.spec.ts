import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent, AuthService } from '@app/core';
import {
  LocalizePipeStub,
  authorizationServiceSpyFactory
} from '@app/core/test-doubles';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let compiled: any;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPageComponent, LocalizePipeStub],
      providers: [
        {
          provide: AuthService,
          useFactory: authorizationServiceSpyFactory
        }
      ]
    }).compileComponents();

    authServiceSpy = TestBed.get(AuthService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authorization service on button click', () => {
    const button = compiled.querySelector('button');
    button.click();
    expect(authServiceSpy.signIn).toHaveBeenCalled();
  });
});
