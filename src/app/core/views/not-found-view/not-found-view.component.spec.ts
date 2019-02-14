import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundViewComponent } from './not-found-view.component';
import { LocalizePipeStub, testModuleDefFactory } from '@app/core/test-doubles';

describe('NotFoundViewComponent', () => {
  let component: NotFoundViewComponent;
  let fixture: ComponentFixture<NotFoundViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(
      testModuleDefFactory({})
    ).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
