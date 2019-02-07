import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { UsersPageComponent } from './users-page.component';
import { UsersService } from '../../services';
import { LocalizationService } from '@app/core';
import {
  localizationServiceSpyFactory,
  LocalizePipeStub
} from '@app/core/test-doubles';
import { usersFakeFactory } from '@modules/users/test-doubles';

describe('UsersPageComponent', () => {
  let component: UsersPageComponent;
  let fixture: ComponentFixture<UsersPageComponent>;
  let compiled: any;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsersPageComponent, LocalizePipeStub],
      providers: [
        UsersService,
        {
          provide: HttpClient,
          useFactory: () => {
            const spy = jasmine.createSpyObj('HttpClient', ['get']);
            spy.get.and.returnValue(of(usersFakeFactory()));
            return spy;
          }
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
    fixture = TestBed.createComponent(UsersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    httpClientSpy = TestBed.get(HttpClient);
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
