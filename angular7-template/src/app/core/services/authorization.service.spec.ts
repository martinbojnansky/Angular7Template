import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { AuthorizationService } from './authorization.service';
import { LocalStorageKeys, AppRoutes } from '@app/shared';

describe('AuthorizationService', () => {
  let service: AuthorizationService;
  let storageSpy: jasmine.SpyObj<Storage>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        AuthorizationService,
        {
          provide: Storage,
          useValue: jasmine.createSpyObj('Storage', [
            'getItem',
            'setItem',
            'removeItem'
          ])
        },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate'])
        }
      ]
    });

    service = TestBed.get(AuthorizationService);
    storageSpy = TestBed.get(Storage);
    routerSpy = TestBed.get(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should save token on sign in', () => {
    service.signIn();
    expect(storageSpy.setItem.calls.mostRecent().args[0]).toBe(
      LocalStorageKeys.AUTHORIZATION_TOKEN
    );
  });

  it('should remove token on sign out', () => {
    service.signOut();
    expect(storageSpy.removeItem).toHaveBeenCalledWith(
      LocalStorageKeys.AUTHORIZATION_TOKEN
    );
  });

  it('should navigate to admin route on sign in', () => {
    service.signIn();
    expect(routerSpy.navigate).toHaveBeenCalledWith([AppRoutes.AUTH]);
  });

  it('should navigate to default route on sign out', () => {
    service.signOut();
    expect(routerSpy.navigate).toHaveBeenCalledWith([AppRoutes.DEFAULT]);
  });
});
