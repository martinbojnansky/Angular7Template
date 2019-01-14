import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { UsersRepositoryService } from '../../services';
import { UsersRepositoryServiceMock } from '../../mocks';
import { Component, Input } from '@angular/core';
import { User } from '../../models';

@Component({ selector: 'app-user-detail', template: '' })
class UserDetailStubComponent {
  @Input() user: User;
}

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  // let usersRepositoryServiceSpy: jasmine.SpyObj<UsersRepositoryService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsersComponent, UserDetailStubComponent],
      providers: [
        {
          provide: UsersRepositoryService,
          // useValue: jasmine.createSpyObj('UsersRepository', ['getUsers'])
          useFactory: () => new UsersRepositoryServiceMock(null)
        }
      ]
    }).compileComponents();

    // mockUsersRepositoryService();
  }));

  // function mockUsersRepositoryService() {
  //   usersRepositoryServiceSpy = TestBed.get(UsersRepositoryService);
  //   usersRepositoryServiceSpy.getUsers.and.returnValue(
  //     new Observable(<any>{
  //       data: [
  //         {
  //           id: 1,
  //           first_name: 'George',
  //           last_name: 'Bluth',
  //           avatar:
  //             'https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg'
  //         }
  //       ]
  //     })
  //   );
  // }

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
