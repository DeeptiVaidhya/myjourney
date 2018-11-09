import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeAfterCancerComponent } from './life-after-cancer.component';

describe('LifeAfterCancerComponent', () => {
  let component: LifeAfterCancerComponent;
  let fixture: ComponentFixture<LifeAfterCancerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LifeAfterCancerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LifeAfterCancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
