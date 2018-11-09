import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { QuestionnaireService } from '../../service/questionnaire.service';

@Component({
	selector: 'app-promis',
	templateUrl: './promis.component.html',
	styleUrls: ['./promis.component.css'],
})
export class PromisComponent implements OnInit {
	@ViewChild(ModalDirective) modal: ModalDirective;
	type: any = 'physical';
	is_back = false;
	count: any;
	previous_type: any = '';
	current_index: any = 0;
	current_form: any = '';
	questions: any = [];
	answer: any = [];
	data: any;
	current_week = '';
	isShown = false;
	first_ques = false;
	breadcrumb = [{ link: '/', title: 'Home' }, { title: 'Questionnaire', class:'active' }];

	constructor(
		private router: Router,
		public toastr: ToastsManager,
		public questionnaireService: QuestionnaireService,
		private elRef: ElementRef
	) { }

	ngOnInit() {
		this.getCurrentWeek();
	}

	// get Provider Data
	begin_questionnaire() {

		this.count = 0;
		if (this.questions && this.questions.length) {
			this.modal.show();
			return false;
		}
		this.questionnaireService.get_promis_data().then(
			result => {
				const response = result;
				if (response['status'] === 'success') {
					this.questions = response['data'][0];
					this.is_back = this.questions.hasOwnProperty('is_back') ? this.questions.is_back : false;
					if (this.questions.description !== '') {
						this.type = response['type'];
						this.modal.show();
					}
					else {
						if (this.current_week === '1' || this.current_week === '8') {
							this.router.navigate(['/patient/dashboard/ies']).then(() => {
								this.toastr.success(response['msg'], null, { showCloseButton: true });
							});
						} else {
							this.router.navigate(['/patient/dashboard']).then(() => {
								this.toastr.success(response['msg'], null, { showCloseButton: true });
							});
						}
					}
				}
			},
			err => {
				console.log(err);
			}
		);
	}

	/**
	 * 
	 * @desc Get the next question from PROMIS Questionnaire Type
	 */
	next() {
		const elem = this.elRef.nativeElement.querySelector('[type="radio"]:checked');
		// console.log(elem);
		let data;
		if (elem != null) {
			const index = elem.getAttribute('data-index');
			data = {
				Description: this.questions.option[index].Description,
				FormItemOID: this.questions.FormItemOID,
				ItemResponseOID: this.questions.option[index].ItemResponseOID,
				Value: this.questions.option[index].Value,
				Question: this.questions.description,
				OID: this.questions.OID,
				type: this.type,
			};
		} else {
			data = {
				Question: this.questions.description,
				OID: this.questions.OID,
				type: this.type,
				FormItemOID: this.questions.FormItemOID
			};
		}
		this.getPromisData(data);
	}

	getPromisData(data) {
		this.questionnaireService.save_promis(data).then(
			result => {
				const response = result;
				if (response['status'] === 'success') {
					if (response.hasOwnProperty('data')) {
						this.questions = response['data'][0];
						if (this.questions.hasOwnProperty('answer')) {
							this.answer = this.questions['answer'];
						}
						this.is_back = this.questions.hasOwnProperty('is_back') ? this.questions.is_back : false;

						// this.count = this.type !== response['type'] ? 0 : this.count;
						this.type = response['type'];
					} else {
						this.modal.hide();
						if (this.current_week === '1' || this.current_week === '8') {
							this.router.navigate(['/patient/dashboard/ies']).then(() => {
								this.toastr.success(response['msg'], null, { showCloseButton: true });
							});
						} else {
							if (!this.isShown) {
								this.isShown = true;
							}
						}
					}
				}
			},
			err => {
				console.log(err);
			}
		);
	}

	/**
	 * 
	 * @desc Changing current index to show previous promis questionnaire
	 */
	back() {
		const data = {
			Previous: true,
			OID: this.questions.OID,
			type: this.type,
			FormItemOID: this.questions.FormItemOID
		};
		this.getPromisData(data);
	}

	get_result(data) {
		this.questionnaireService.promis_result(data).then(
			result => {
				const response = result;
				if (response['status'] === 'success') {
					this.questions = response['data'];
				}
			},
			err => {
				console.log(err);
			}
		);
	}

	getCurrentWeek() {
		this.questionnaireService.get_current_week().then(
			result => {
				this.data = result;
				if (this.data.status === 'success') {
					const week_info = this.data.data;
					this.current_week = week_info['week_number'];
				} else {
					this.toastr.error(this.data.msg);
				}
			},
			err => { }
		);

		// Add promis assessment id and get promis type
		this.questionnaireService.add_promis_assessments().then(
			result => { },
			err => { }
		);
	}
}
