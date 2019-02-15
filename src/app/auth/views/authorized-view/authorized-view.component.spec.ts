import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizedViewComponent } from './authorized-view.component';
import { AuthService } from '@app/core';
import { authInfoFakeFactory } from '@app/core/test-doubles';
import { LocalStorageKey } from '@assets/constants';
import { authTestModuleDefFactory } from '@app/auth/test-doubles';

describe('AuthorizedViewComponent', () => {
  let component: AuthorizedViewComponent;
  let fixture: ComponentFixture<AuthorizedViewComponent>;
  let compiled: any;
  let authService: AuthService;
  let signOutButton: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule(
      authTestModuleDefFactory({
        localStorageValues: {
          [LocalStorageKey.AUTH_TOKEN]: authInfoFakeFactory().token
        }
      })
    ).compileComponents();

    authService = TestBed.get(AuthService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    signOutButton = compiled.querySelector('.signout-btn');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call auth service on sign out button click', () => {
    const signOutSpy = spyOn(authService, 'signOut');
    signOutButton.click();
    expect(signOutSpy).toHaveBeenCalled();
  });
});
