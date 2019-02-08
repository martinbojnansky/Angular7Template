import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersViewComponent } from './users-view.component';
import { UsersService } from '../../services';
import { LocalizationService } from '@app/core';
import {
  localizationServiceSpyFactory,
  LocalizePipeStub
} from '@app/core/test-doubles';
import { UsersRepositoryServiceStub } from '@modules/users/test-doubles';
import { UsersRepositoryService } from '@modules/users/repositories';

describe('UsersViewComponent', () => {
  let component: UsersViewComponent;
  let fixture: ComponentFixture<UsersViewComponent>;
  let compiled: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsersViewComponent, LocalizePipeStub],
      providers: [
        UsersService,
        {
          provide: UsersRepositoryService,
          useClass: UsersRepositoryServiceStub
        },
        {
          provide: LocalizationService,
          useFactory: localizationServiceSpyFactory
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize users', () => {
    expect(component.usersService.state.users.length).toBe(3);
    expect(component.usersService.state.users[1].id).toBe(2);
    expect(component.usersService.state.users[2].id).toBe(3);
    expect(component.usersService.state.users[0].id).toBe(1);
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
    expect(component.usersService.state.selectedUser.id).toBe(2);
  });
});
