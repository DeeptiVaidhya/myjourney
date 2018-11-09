import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthyMindComponent } from './healthy-mind.component';

describe('HealthyMindComponent', () => {
  let component: HealthyMindComponent;
  let fixture: ComponentFixture<HealthyMindComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthyMindComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthyMindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
