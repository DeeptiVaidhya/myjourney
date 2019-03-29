import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuestionnaireService } from '../../service/questionnaire.service';
// import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
	selector: 'app-pro-ctcae',
	templateUrl: './pro-ctcae.component.html',
	styleUrls: ['./pro-ctcae.component.css'],
})
export class ProCtcaeComponent implements OnInit {
	data: any;
	proctcae_detail = [];
	total_question_groups = 0;
	page_number = 1;
	symptom_percentage = 0;
	question_count = 0;
	breadcrumb = [{ link: '/', title: 'Home' }, { title: 'Questionnaire', class:'active' }];

	constructor(
		private router: Router,
		public toastr: ToastrService,
		public questionnaireService: QuestionnaireService
	) { }
	/**
	 * @desc Set all Pro-Ctcae Questions on Page View Init
	 */
	ngOnInit() {
		this.getQuestionnaire();
	}

	/**
	 * @desc Get Pro-Ctcae Questionnaire for each patient depending on cancer type.
	 */
	getQuestionnaire() {
		const querystring = 'type=2&page=' + this.page_number++;
		this.questionnaireService.get_questionnaire(querystring).then(
			result => {
				this.data = result;
				if (this.data.status === 'success') {
					this.proctcae_detail = this.proctcae_detail.concat(this.data.data);
					this.total_question_groups = this.data.count;
					this.question_count += this.data.question_count;
					this.symptom_percentage = (this.proctcae_detail.length / this.total_question_groups) * 100;
				}
			},
			err => { }
		);
	}

	/**
	 * @desc Saving the question's response done by patients
	 */
	save() {
		const data: Object = { options_id: [], questions_id: [] },
			option_ids = document.querySelectorAll("input[name^='option[']:checked");
		for (let i = 0, opt = option_ids, len = opt.length; i < len; i++) {
			const question_id = opt[i].getAttribute('data-question-id');
			console.log(question_id);
			const values = opt[i]['value'];
			data['options_id'][i] = values;
			data['questions_id'][i] = question_id;
		}
		data['questionnaires_id'] = 2; // It is unique for Pro-Ctcae
		data['question_count'] = this.question_count;
		console.log(data);
		this.questionnaireService.save_questionnaire(data).then(
			response => {
				this.data = response;
				if (this.data.status === 'success') {
					this.router.navigate(['/patient/dashboard/promis']).then(() => {
						this.toastr.success(this.data.msg);
					});
					// if (this.current_week === '1' || this.current_week === '8') {
					// 	this.router.navigate(['/patient/dashboard/ies']).then(() => {
					// 		this.toastr.success(this.data.msg);
					// 	});
					// } else {

					// 	this.router.navigate(['/patient/dashboard']).then(() => {
					// 	this.toastr.success('Weekly questionnaire is completed successfully.');
					// 	});
					// }
				} else {
					this.toastr.error(this.data.msg);
				}
			},
			err => {
				console.log(err);
			}
		);
	}

}
