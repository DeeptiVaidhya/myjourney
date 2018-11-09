import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderstandingBreastCancerComponent } from './understanding-breast-cancer.component';

describe('UnderstandingBreastCancerComponent', () => {
  let component: UnderstandingBreastCancerComponent;
  let fixture: ComponentFixture<UnderstandingBreastCancerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnderstandingBreastCancerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderstandingBreastCancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
