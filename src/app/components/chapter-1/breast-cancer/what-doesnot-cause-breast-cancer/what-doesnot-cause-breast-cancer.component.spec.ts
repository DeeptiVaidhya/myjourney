import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatDoesnotCauseBreastCancerComponent } from './what-doesnot-cause-breast-cancer.component';

describe('WhatDoesnotCauseBreastCancerComponent', () => {
  let component: WhatDoesnotCauseBreastCancerComponent;
  let fixture: ComponentFixture<WhatDoesnotCauseBreastCancerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhatDoesnotCauseBreastCancerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatDoesnotCauseBreastCancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
