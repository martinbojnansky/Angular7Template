import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HomeRepositoryService } from '../../services';
import { HomeRepositoryMockService } from '../../mocks';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  // let homeRepositoryServiceSpy: jasmine.SpyObj<HomeRepositoryService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        {
          provide: HomeRepositoryService,
          // useValue: jasmine.createSpyObj('HomeRepository', ['getUsers'])
          useFactory: () => new HomeRepositoryMockService(null)
        }
      ]
    }).compileComponents();

    // mockHomeRepositoryService();
  }));

  // function mockHomeRepositoryService() {
  //   homeRepositoryServiceSpy = TestBed.get(HomeRepositoryService);
  //   homeRepositoryServiceSpy.getUsers.and.returnValue(
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
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
