import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProCtcaeComponent } from './pro-ctcae.component';

describe('ProCtcaeComponent', () => {
  let component: ProCtcaeComponent;
  let fixture: ComponentFixture<ProCtcaeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProCtcaeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProCtcaeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
