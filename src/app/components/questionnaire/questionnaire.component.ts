import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuestionnaireService } from '../../service/questionnaire.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {

	data: any;
	options = [];
	questions:any;
	answer: any;
	group_title:any;
	short_description:any;
	total_question_groups = 0;
	page_number = 1;
	type:string = '';
	symptom_percentage = 0;
	weekInfoId:any;
	question_count = 0;
	breadcrumb = [{ link: '/', title: 'Home' }, { title: 'Questionnaire', class:'active' }];

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		public toastr: ToastrService,
		public questionnaireService: QuestionnaireService
	) { }
	/**
	 * @desc Set all Pro-Ctcae Questions on Page View Init
	 */
	ngOnInit() {
		
		this.route.params.subscribe(param => {
			this.type = param['type'] == 'case-cancer' ? 'CASE_CANCER' : param['type'];
			// this.question = [];
			console.log(this.type);
			this.getQuestionnaire();
		});
		
	}

	/**
	 * @desc Get Pro-Ctcae Questionnaire for each patient depending on cancer type.
	 */
	getQuestionnaire() {
		
		this.questionnaireService.get_questionnaire({ type: this.type.toUpperCase() }).subscribe(
			Response => {
				if (Response['status'] == 'success') {
					this.questions = Response['questions'];
					this.options = Response['options'];
					this.group_title = Response['group_title'];
					this.weekInfoId = Response['week_info']['id'];
					this.short_description = Response['short_description'];
				}else{
					
						this.toastr.error(Response['msg']);
						this.router.navigate(["/patient/dashboard"]);
				}
			}
		);
	}

	/**
	 * @desc Saving the question's response done by patients
	 */
	save() {
		const data =  [],
			option_ids = document.querySelectorAll("input[name^='option[']:checked");
		for (let i = 0, opt = option_ids, len = opt.length; i < len; i++) {
			const question_id = opt[i].getAttribute('data-question-id');
			const group_id = opt[i].getAttribute('group-id');
			const values = opt[i]['value'];
			const response = opt[i].getAttribute('title');
			data.push({ options_id : values, questions_id : question_id, options_question_groups_id:group_id, week_info_id: this.weekInfoId, response: response});
			
		}
	
		this.questionnaireService.save_questionnaire(data).subscribe(
			Response => {
				if (Response['status'] == 'success') {
					let path:any;
					path = this.type == 'intolerance' ? ['/questionnaire/rumination'] : (this.type == 'rumination' ? ['/questionnaire/promis'] : (this.type == 'promis' ? ['/questionnaire/case-cancer'] : ''));
					this.router.navigate(path).then(() => {
						this.toastr.success(Response['msg']);
					});
				} else {
						this.toastr.error(Response['msg']);
				}
			}
		);
	}


}
