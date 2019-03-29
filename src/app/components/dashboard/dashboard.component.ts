import { AmChartsService } from '@amcharts/amcharts3-angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import '../../../assets/js/pie.js';
import { QuestionnaireService } from '../../service/questionnaire.service';
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	chart: any;
	data: any;
	username: any;
	user_detail: any = [];
	Response:any;
	pageContent:any;
	is_CPS_Completed = false;
	is_questionnaire_completed = false;
	total_questionnaire: number = 8;// total questionnaires.
	incompleted_questionnaire: number = 8;// default all questionnaires are not completed.
	completed_questionnaire: number = 0;// default 0 questionnaire are completed.
	questionnaire_link = 'fact-g7';
	questionnaire_links = { 1: 'fact-g7', 2: 'pro-ctcae', 3: 'ies', 4: 'promis' };
	all_week_status = '';
	is_genomic_result_date = false;
	routeData:any;
	routlink:any = 'understanding-breast-cancer';
	constructor(
		private AmCharts: AmChartsService,
		private questService: QuestionnaireService,
		public toastr: ToastrService,
		public router: Router,
	) { 
		
	}

	ngOnInit() {

		this.callingChart();
		localStorage.getItem('username') && (this.username = localStorage.getItem('username'));

		this.questService.patients_weekly_questionnaire().then(
			result => {
				console.log(result)
				const response = result;
				if (response.hasOwnProperty('chapters')) {
					this.pageContent = response['chapters'];
				}
				if (response.hasOwnProperty('data') && response['data'].hasOwnProperty('total_q')) {
					if (!(response['data']['week_number'] == 1 || response['data']['week_number'] == 8)) {
						this.total_questionnaire = 7;
						this.incompleted_questionnaire = 7;
					}
					this.completed_questionnaire = response['data'].total_q;
					this.incompleted_questionnaire = this.total_questionnaire - this.completed_questionnaire;
					// this.callingChart();
					if (response['data']['current_questionnaire'].hasOwnProperty('questionnaires_id')) {
						if ((response['data']['current_questionnaire']['questionnaires_id'] == 3 && (response['data']['week_number'] == 1 || response['data']['week_number'] == 8)) || response['data']['current_questionnaire']['questionnaires_id'] != 3) {
							this.questionnaire_link = this.questionnaire_links[response['data']['current_questionnaire']['questionnaires_id']];
						}
					}
				}
				this.is_CPS_Completed = response['data'].hasOwnProperty('is_cps_completed') && response['data'].is_cps_completed == true;
				this.all_week_status = response['data'].hasOwnProperty('week_status') && response['data'].week_status;
				this.user_detail = response['data'].hasOwnProperty('user_detail') && response['data'].user_detail;
				this.is_questionnaire_completed = response['data'].hasOwnProperty('is_questionnaire_completed') && response['data'].is_questionnaire_completed == true;
				this.is_genomic_result_date = response['data'].hasOwnProperty('is_genomic_result_date') && response['data'].is_genomic_result_date == true;
				console.log("detail"+this.user_detail.genomic_test_start_date);
			},
			err => {
				console.log(err);
			}
		);
	}

	callingChart() {
		this.chart = this.AmCharts.makeChart('chartdiv', {
			type: 'pie',
			theme: 'light',
			startDuration: 0,
			dataProvider: [{ value: this.completed_questionnaire, color: '#8934d4' }, { value: this.incompleted_questionnaire, color: '#dfdfdf' }],
			titleField: 'title',
			valueField: 'value',
			labelRadius: 5,
			colorField: 'color',
			radius: '45%',
			innerRadius: '45%',
			labelText: '[[title]]',
		});
	}
	ngOnDestroy() {
		if (this.chart) {
			// this.AmCharts.destroyChart(this.chart);
		}
	}

	reportNotFound() {
		this.toastr.error('Genomic profile report not available.');
	}


}
