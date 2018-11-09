import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { QuestionnaireService } from '../../service/questionnaire.service';

@Component({
	selector: 'app-questionnaire-with-concern',
	templateUrl: './questionnaire-with-concern.component.html',
	styleUrls: ['./questionnaire-with-concern.component.css'],
})
export class QuestionnaireWithConcernComponent implements OnInit, OnChanges {
	@ViewChild('childModal') childModal: ModalDirective;
	@Input('toggle') isShown = false;
	isElevatedPatients: boolean = false;
	common_symptoms: any = '';
	constructor(public questionnaireService: QuestionnaireService) { }

	ngOnInit() { }
	ngOnChanges() {
		this.common_elevated_symptoms();
	}



	// get Provider Data
	common_elevated_symptoms() {
		this.questionnaireService.common_elevated_symptoms().then(
			result => {
				const response = result;
				if (response['status'] === 'success') {
					this.common_symptoms = response['data'];
					this.isShown && this.childModal.show();
				}
			},
			err => {
				console.log(err);
			}
		);
	}
}
