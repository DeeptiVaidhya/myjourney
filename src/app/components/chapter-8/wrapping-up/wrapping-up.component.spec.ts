import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WrappingUpComponent } from './wrapping-up.component';

describe('WrappingUpComponent', () => {
  let component: WrappingUpComponent;
  let fixture: ComponentFixture<WrappingUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WrappingUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WrappingUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
