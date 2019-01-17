import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input } from '@angular/core';

import { UsersComponent } from './users.component';
import { UsersRepositoryService } from '../../services';
import { UsersRepositoryServiceMock } from '../../mocks';
import { User } from '../../models';

@Component({ selector: 'app-user-detail', template: '' })
class UserDetailStubComponent {
  @Input() user: User;
}

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsersComponent, UserDetailStubComponent],
      providers: [
        {
          provide: UsersRepositoryService,
          useFactory: () => new UsersRepositoryServiceMock(null)
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize users', () => {
    expect(component.users.length).toBe(3);
    expect(component.users[0].id).toBe(1);
    expect(component.users[1].id).toBe(2);
    expect(component.users[2].id).toBe(3);
  });

  it('should render users table', () => {
    const rows = compiled.querySelectorAll('.users-table > tbody > tr');

    expect(rows.length).toBe(3);
  });

  it('should select user on row click', () => {
    const row = compiled.querySelector(
      '.users-table > tbody > tr:nth-child(2)'
    );
    row.click();

    expect(component.selectedUser.id).toBe(2);
  });

  it('should unselect user', () => {
    const user: User = {
      id: 1,
      first_name: 'fn',
      last_name: 'ln',
      avatar: 'av'
    };

    component.onSelectUser(user);
    expect(component.selectedUser).toBe(user);

    component.onUnselectUser(user);
    expect(component.selectedUser).toBe(null);
  });

  it('should order users on header click', () => {
    const header = compiled.querySelector(
      '.users-table > thead > tr > th:nth-child(3)'
    );

    header.click();

    expect(component.users[0].id).toBe(3);
    expect(component.users[1].id).toBe(1);
    expect(component.users[2].id).toBe(2);
  });
});
