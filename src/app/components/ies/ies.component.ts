import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { QuestionnaireService } from '../../service/questionnaire.service';

@Component({
	selector: 'app-ies',
	templateUrl: './ies.component.html',
	styleUrls: ['./ies.component.css'],
})
export class IesComponent implements OnInit {
	@ViewChild(ModalDirective) modal: ModalDirective;
	data: any;
	answers: any;
	default: any;
	header: String = '';
	question_count: 0;
	isShown = false;
	current_week: any;
	breadcrumb = [{ link: '/patient/dashboard', title: 'Home' }, { title: 'Questionnaire', class:'active' }];

	constructor(
		private router: Router,
		public toastr: ToastrService,
		public questionnaireService: QuestionnaireService,
	) { }

	ngOnInit() {
		this.getCurrentWeek();
	}


	getQuestionnaire() {
		const querystring = 'type=3';
		this.questionnaireService.get_questionnaire(querystring).then(
			result => {
				this.data = result;
				if (this.data.status === 'success') {
					const question_list = this.data.data;
					this.question_count = this.data.question_count;
					if (question_list.length > 0) {
						this.default = question_list[0];
						this.header = question_list[0]['question'][0]['ques_options'];

					}
				} else {
					this.toastr.error(this.data.msg);
				}
			},
			err => {
			}
		);

	}

	// Save Answer given by user
	save() {
		const data: Object = { options_id: [], questions_id: [], type: [] },
			option_ids = document.querySelectorAll('input[name^=\'option[\']:checked');
		for (let i = 0, opt = option_ids, len = opt.length; i < len; i++) {
			const question_id = opt[i].getAttribute('data-question-id');
			const values = opt[i]['value'];
			data['options_id'][i] = values;
			data['questions_id'][i] = question_id;
			data['type'][i] = 'default';
		}
		data['questionnaires_id'] = 3;
		data['question_count'] = this.question_count;
		this.questionnaireService.save_questionnaire(data).then(
			response => {
				this.data = response;
				if (this.data.status === 'success') {
					console.log(this.isShown);
					if (!this.isShown) {
						this.isShown = true;
					}
					// this.router.navigate(['/patient/dashboard']).then(() => {
					// 	this.toastr.success(this.data.msg);
					// });
				} else {
					this.toastr.error(this.data.msg);
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
					if (week_info['week_number'] === '1' || week_info['week_number'] === '8') {
						this.getQuestionnaire();
					} else {
						this.router.navigate(['/patient/dashboard']);
					}
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
