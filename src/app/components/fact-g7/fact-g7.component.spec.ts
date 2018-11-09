import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactG7Component } from './fact-g7.component';

describe('FactG7Component', () => {
  let component: FactG7Component;
  let fixture: ComponentFixture<FactG7Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactG7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactG7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
