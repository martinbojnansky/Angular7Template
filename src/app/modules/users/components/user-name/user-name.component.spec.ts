import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNameComponent } from './user-name.component';
import { User } from '../../models';
import { userFakeFactory } from '../../test-doubles/fakes/user.fake';
import { usersTestModuleDefFactory } from '@modules/users/test-doubles/moduleDefs';

describe('UserNameComponent', () => {
  let component: UserNameComponent;
  let fixture: ComponentFixture<UserNameComponent>;
  let compiled: any;
  const userFake: User = userFakeFactory();

  beforeEach(async(() => {
    TestBed.configureTestingModule(
      usersTestModuleDefFactory()
    ).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNameComponent);
    component = fixture.componentInstance;
    component.user = Object.assign({}, userFakeFactory());
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display first name', () => {
    const firstName = compiled.querySelector('p:first-child > span')
      .textContent;

    expect(firstName).toBe(userFake.first_name);
  });
});
