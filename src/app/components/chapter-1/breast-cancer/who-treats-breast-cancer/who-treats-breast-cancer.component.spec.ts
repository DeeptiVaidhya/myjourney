import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhoTreatsBreastCancerComponent } from './who-treats-breast-cancer.component';

describe('WhoTreatsBreastCancerComponent', () => {
  let component: WhoTreatsBreastCancerComponent;
  let fixture: ComponentFixture<WhoTreatsBreastCancerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhoTreatsBreastCancerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhoTreatsBreastCancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
