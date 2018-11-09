import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LungCancerScreeningComponent } from './lung-cancer-screening.component';

describe('LungCancerScreeningComponent', () => {
  let component: LungCancerScreeningComponent;
  let fixture: ComponentFixture<LungCancerScreeningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LungCancerScreeningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LungCancerScreeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
