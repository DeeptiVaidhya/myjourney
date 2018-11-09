import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatIsBreastCancerComponent } from './what-is-breast-cancer.component';

describe('WhatIsBreastCancerComponent', () => {
  let component: WhatIsBreastCancerComponent;
  let fixture: ComponentFixture<WhatIsBreastCancerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhatIsBreastCancerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatIsBreastCancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
