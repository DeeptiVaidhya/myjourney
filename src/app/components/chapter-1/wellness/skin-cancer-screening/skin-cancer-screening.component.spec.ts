import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkinCancerScreeningComponent } from './skin-cancer-screening.component';

describe('SkinCancerScreeningComponent', () => {
  let component: SkinCancerScreeningComponent;
  let fixture: ComponentFixture<SkinCancerScreeningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkinCancerScreeningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkinCancerScreeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
