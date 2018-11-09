import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { QuestionnaireService } from '../../service/questionnaire.service';

@Component({
	selector: 'app-fact-g7',
	templateUrl: './fact-g7.component.html',
	styleUrls: ['./fact-g7.component.css']
})
export class FactG7Component implements OnInit {
	data: any;
	core_question: any;
	extra_question: any;
	header: String = '';
	answers: any;
	question_count: 0;
	breadcrumb = [{ link: '/patient/dashboard', title: 'Home' }, { title: 'Questionnaire', class:'active' }];

	constructor(
		private router: Router,
		public toastr: ToastsManager,
		public questionnaireService: QuestionnaireService,
	) { }

	ngOnInit() {
		this.getQuestionnaire();
	}

	getQuestionnaire() {
		const querystring = 'type=1';
		this.questionnaireService.get_questionnaire(querystring).then(
			result => {
				this.data = result;
				if (this.data.status === 'success') {
					const question_list = this.data.data;
					this.question_count = this.data.question_count;
					if (question_list.length > 0) {
						this.core_question = question_list[0];
						this.header = question_list[0]['question'][0]['ques_options'];
						this.extra_question = question_list[1];
						console.log(this.header);
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
			data['options_id'][i] = opt[i]['value'];
			data['questions_id'][i] = opt[i].getAttribute('data-question-id');
			data['type'][i] = opt[i].getAttribute('data-question-type');
		}
		data['questionnaires_id'] = 1;
		data['question_count'] = this.question_count;
		console.log(data);
		this.questionnaireService.save_questionnaire(data).then(
			response => {
				this.data = response;
				if (this.data.status === 'success') {
					this.router.navigate(['/patient/dashboard/pro-ctcae']).then(() => {
						this.toastr.success(this.data.msg, null, { showCloseButton: true });
					});
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
