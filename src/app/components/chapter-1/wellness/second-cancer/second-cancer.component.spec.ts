import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondCancerComponent } from './second-cancer.component';

describe('SecondCancerComponent', () => {
  let component: SecondCancerComponent;
  let fixture: ComponentFixture<SecondCancerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondCancerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondCancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
