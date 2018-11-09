import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SunProtectionComponent } from './sun-protection.component';

describe('SunProtectionComponent', () => {
  let component: SunProtectionComponent;
  let fixture: ComponentFixture<SunProtectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SunProtectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SunProtectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
