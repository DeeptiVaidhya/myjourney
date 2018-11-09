import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireWithConcernComponent } from './questionnaire-with-concern.component';

describe('QuestionnaireWithConcernComponent', () => {
  let component: QuestionnaireWithConcernComponent;
  let fixture: ComponentFixture<QuestionnaireWithConcernComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionnaireWithConcernComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnaireWithConcernComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
