import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhoGetsBreastCancerComponent } from './who-gets-breast-cancer.component';

describe('WhoGetsBreastCancerComponent', () => {
  let component: WhoGetsBreastCancerComponent;
  let fixture: ComponentFixture<WhoGetsBreastCancerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhoGetsBreastCancerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhoGetsBreastCancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
