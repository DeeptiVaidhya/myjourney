import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { QuestionnaireService } from '../../service/questionnaire.service';

@Component({
	selector: 'app-decision-making',
	templateUrl: './decision-making.component.html',
	styleUrls: ['./decision-making.component.css'],
})
export class DecisionMakingComponent implements OnInit {
	@ViewChild(ModalDirective) modal: ModalDirective;

	data: any;
	questions: any;
	option_selection = [];
	allElemLi: any;
	selectedIndex: number = -1;
	selectedResponse: string = '';
	flagSelectionChanged=false;
	cps_result = {
		style: '',
		description: '',
	};
	breadcrumb = [{ link: '/', title: 'Home' }, { title:'Questionnaire',class:'active' }];

	constructor(
		public questionnaireService: QuestionnaireService,
		public toastr: ToastrService,
		private router: Router
	) {}

	ngOnInit() {
		this.getCPS();
	}

	resetSelection() {
		!this.flagSelectionChanged && (this.flagSelectionChanged=!0);
		this.selectedResponse = '';
		for (let i = 0, el = document.querySelectorAll('.disabled'), l = el.length; i < l; i++) {
			el[i].classList.remove('disabled');
		}
	}


	changeSelection(value, index) {
		!this.flagSelectionChanged && (this.flagSelectionChanged=!0);
		this.allElemLi = document.querySelectorAll('.cps-li');
		console.log('clicked');
		if (this.selectedResponse!='') {
			this.toastr.error('Please click on "Reset" to change your selection.');
			return false;
		}
		if(this.allElemLi[index].classList.contains('disabled')){
			this.toastr.error("You can't select this option.");
			return false;
		}
		this.selectedResponse = value;
		this.selectedIndex = index;
	}

	getCPS() {
		this.questionnaireService.get_cps().then(
			result => {
				this.data = result;
				if (this.data.status === 'success') {
					const response = this.data.data;
					if (response.hasOwnProperty('question')) {
						this.questions = response.question; //question_list[0];
					}

					if (response.answer && response.answer.hasOwnProperty('response')) {
						this.option_selection = response.answer.response; //question_list[0];
						// this.option_selection.reverse();
						this.selectedResponse = response.answer.combination;
						for (let i = 0, q = this.questions, l = q.length; i < l; i++) {
							if (this.option_selection[0] == q[i].label) {
								this.selectedIndex = i;
								break;
							}
						}
						let questions = this.questions,
							option_selection = this.option_selection;
						setTimeout(function(){
							for (let i = 0, q = questions, l = q.length; i < l; i++) {
								if(option_selection.indexOf(q[i].label)===-1){
									console.log(document.getElementById('cps-'+q[i].label),q[i]);
									document.getElementById('cps-'+q[i].label).classList.add('disabled');
								}
							}
						},100);
						
						this.cps_result.style = response.answer.style;
						this.cps_result.description = response.answer.description;
					}
				} else {
					this.toastr.error(this.data.msg);
				}
			},
			err => {}
		);
	}

	/**
	 * @desc Saving the result added by Patients.
	 */
	save() {
		if (this.selectedResponse=='') {
			this.toastr.error('Please select an option.');
			return false;
		}
		// Calling API to Save Patient's CPS response
		this.questionnaireService.save_cps({ response: this.selectedResponse }).then(
			response => {
				this.data = response;
				if (this.data.status === 'success') {
					this.router.navigate(['/patient/dashboard/decision-making']).then(() => {
						this.modal.show();
						this.flagSelectionChanged = !1;
						this.getCPS();
						this.toastr.success(this.data.msg);
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
