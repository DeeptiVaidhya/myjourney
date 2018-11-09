import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreastCancerTreatmentComponent } from './breast-cancer-treatment.component';

describe('BreastCancerTreatmentComponent', () => {
  let component: BreastCancerTreatmentComponent;
  let fixture: ComponentFixture<BreastCancerTreatmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreastCancerTreatmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreastCancerTreatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
