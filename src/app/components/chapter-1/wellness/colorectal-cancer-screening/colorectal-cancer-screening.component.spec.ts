import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorectalCancerScreeningComponent } from './colorectal-cancer-screening.component';

describe('ColorectalCancerScreeningComponent', () => {
  let component: ColorectalCancerScreeningComponent;
  let fixture: ComponentFixture<ColorectalCancerScreeningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorectalCancerScreeningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorectalCancerScreeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
