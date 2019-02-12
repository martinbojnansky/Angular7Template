import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { AuthorizedViewComponent } from './authorized-view.component';
import { AuthService, LocalizationService } from '@app/core';
import { ConstantsPipe } from '@app/shared';
import {
  LocalizePipeStub,
  localizationServiceSpyFactory,
  authServiceSpyFactory
} from '@app/core/test-doubles';

describe('AuthorizedViewComponent', () => {
  let component: AuthorizedViewComponent;
  let fixture: ComponentFixture<AuthorizedViewComponent>;
  let compiled: any;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorizedViewComponent, LocalizePipeStub, ConstantsPipe],
      providers: [
        {
          provide: AuthService,
          useFactory: authServiceSpyFactory
        },
        {
          provide: LocalizationService,
          useFactory: localizationServiceSpyFactory
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    authServiceSpy = TestBed.get(AuthService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authorization service on button click', () => {
    const button = compiled.querySelector('.signout-btn');
    button.click();
    expect(authServiceSpy.signOut).toHaveBeenCalled();
  });
});
