import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { UserDetailComponent } from './user-detail.component';
import { User } from '../../models';

describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let compiled: any;
  const userMock = {
    id: 1,
    first_name: 'fn',
    last_name: 'ln',
    avatar: 'av'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserDetailComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    component.user = Object.assign({}, userMock);
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display content when user is set', () => {
    const section = compiled.querySelector('section');

    expect(section).toBeTruthy();
  });

  it('should not display when user is not set', () => {
    component.user = null;
    fixture.detectChanges();
    const section = compiled.querySelector('section');

    expect(section).toBeNull();
  });

  it('should display avatar', () => {
    const section = compiled.querySelector('img').src;

    expect(section).toContain(userMock.avatar);
  });

  it('should emit closed on button click', () => {
    const button = compiled.querySelector('.close-btn');
    let emittedUser: User;

    component.closed.subscribe(u => {
      emittedUser = u;
    });
    button.click();

    expect(emittedUser.id).toBe(userMock.id);
  });
});
