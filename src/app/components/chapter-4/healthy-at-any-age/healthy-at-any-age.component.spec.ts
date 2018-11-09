import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthyAtAnyAgeComponent } from './healthy-at-any-age.component';

describe('HealthyAtAnyAgeComponent', () => {
  let component: HealthyAtAnyAgeComponent;
  let fixture: ComponentFixture<HealthyAtAnyAgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthyAtAnyAgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthyAtAnyAgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
