import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StayingActiveComponent } from './staying-active.component';

describe('StayingActiveComponent', () => {
  let component: StayingActiveComponent;
  let fixture: ComponentFixture<StayingActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StayingActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StayingActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
