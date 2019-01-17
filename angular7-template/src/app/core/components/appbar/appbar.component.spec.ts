import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppbarComponent } from './appbar.component';
import { AuthorizationService } from '@app/core/services';

describe('AppbarComponent', () => {
  let component: AppbarComponent;
  let fixture: ComponentFixture<AppbarComponent>;
  let authorizationServiceSpy: jasmine.SpyObj<AuthorizationService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppbarComponent],
      providers: [
        {
          provide: AuthorizationService,
          useValue: jasmine.createSpyObj('AuthorizationService', [
            'isAuthorized'
          ])
        }
      ]
    }).compileComponents();

    authorizationServiceSpy = TestBed.get(AuthorizationService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
