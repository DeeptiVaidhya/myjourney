import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EatWellFeelWellComponent } from './eat-well-feel-well.component';

describe('EatWellFeelWellComponent', () => {
  let component: EatWellFeelWellComponent;
  let fixture: ComponentFixture<EatWellFeelWellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EatWellFeelWellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EatWellFeelWellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
