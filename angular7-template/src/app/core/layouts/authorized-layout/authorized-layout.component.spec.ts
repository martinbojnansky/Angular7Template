import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AuthorizedLayoutComponent } from './authorized-layout.component';
import { AuthService } from './../../services';

describe('AuthorizedLayoutComponent', () => {
  let component: AuthorizedLayoutComponent;
  let fixture: ComponentFixture<AuthorizedLayoutComponent>;
  let compiled: any;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorizedLayoutComponent],
      providers: [
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('AuthService', ['signOut'])
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    authServiceSpy = TestBed.get(AuthService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizedLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authorization service on signOut method', () => {
    component.signOut();
    expect(authServiceSpy.signOut).toHaveBeenCalled();
  });

  it('should call authorization service on button click', () => {
    const button = compiled.querySelector('.signout-btn');
    button.click();
    expect(authServiceSpy.signOut).toHaveBeenCalled();
  });
});
