import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';
import { AuthService, LocalizationService } from './../../services';
import {
  localizationServiceSpyFactory,
  authorizationServiceSpyFactory
} from '@app/core/test-doubles/spies';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let compiled: any;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      providers: [
        {
          provide: AuthService,
          useFactory: authorizationServiceSpyFactory
        },
        {
          provide: LocalizationService,
          useFactory: localizationServiceSpyFactory
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

  it('should call authorization service on signIn method', () => {
    component.signIn();
    expect(authServiceSpy.signIn).toHaveBeenCalled();
  });

  it('should call authorization service on button click', () => {
    const button = compiled.querySelector('button');
    button.click();
    expect(authServiceSpy.signIn).toHaveBeenCalled();
  });
});
