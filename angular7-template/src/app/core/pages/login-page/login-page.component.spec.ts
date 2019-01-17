import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';
import { AuthorizationService } from './../../services';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  let compiled: any;
  let authorizationServiceSpy: jasmine.SpyObj<AuthorizationService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      providers: [
        {
          provide: AuthorizationService,
          useValue: jasmine.createSpyObj('AuthorizationService', ['signIn'])
        }
      ]
    }).compileComponents();

    authorizationServiceSpy = TestBed.get(AuthorizationService);
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
    expect(authorizationServiceSpy.signIn).toHaveBeenCalled();
  });

  it('should call authorization service on button click', () => {
    const button = compiled.querySelector('button');
    button.click();
    expect(authorizationServiceSpy.signIn).toHaveBeenCalled();
  });
});
