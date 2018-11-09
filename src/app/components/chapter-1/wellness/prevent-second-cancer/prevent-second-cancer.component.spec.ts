import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreventSecondCancerComponent } from './prevent-second-cancer.component';

describe('PreventSecondCancerComponent', () => {
  let component: PreventSecondCancerComponent;
  let fixture: ComponentFixture<PreventSecondCancerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreventSecondCancerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreventSecondCancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
