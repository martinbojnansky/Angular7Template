import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNameComponent } from './user-name.component';
import { LocalizationService } from '@app/core';
import { localizationServiceSpyFactory } from '@app/core/spies';

describe('UserNameComponent', () => {
  let component: UserNameComponent;
  let fixture: ComponentFixture<UserNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserNameComponent],
      providers: [
        {
          provide: LocalizationService,
          useFactory: localizationServiceSpyFactory
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNameComponent);
    component = fixture.componentInstance;
    // component.user = Object.assign({}, userMock);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
