import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareAfterCancerComponent } from './care-after-cancer.component';

describe('CareAfterCancerComponent', () => {
  let component: CareAfterCancerComponent;
  let fixture: ComponentFixture<CareAfterCancerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareAfterCancerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareAfterCancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
