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
	arm: string='';
	user_detail: any = [];
	pageContent:any;
	currentWeek:any;
	weekly_quotes:any;
	currentWeekInfo:any;
	// is_questionnaire_completed = false;
	// total_questionnaire: number = 8;// total questionnaires.
	incompleted_questionnaire: number = 2;// default all questionnaires are not completed.
	completed_questionnaire: number = 0;// default 0 questionnaire are completed.
	// questionnaire_link = 'fact-g7';
	// questionnaire_links = { 1: 'fact-g7', 2: 'pro-ctcae', 3: 'ies', 4: 'promis' };
	all_week_status = '';
	routeData:any;
	is_enable_questionnire:any;
	routlink:any = 'understanding-breast-cancer';
	bluejeansDetails: any;
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
		this.patient_weekly_questionnaire();
		this.blueJeansSession();
	}

	blueJeansSession(){
		this.questService.blueJeansSession().subscribe(
			result => {
				if(result['status'] == "success"){
				this.bluejeansDetails = result['data'];	
				}
				
			},
			err => {
				console.log(err);
			}
		)
	}

    patient_weekly_questionnaire(){
		
		this.questService.patients_weekly_questionnaire().subscribe(
			result => {
				console.log(result)
				const response = result;
				if (response.hasOwnProperty('chapters')) {
					this.pageContent = response['chapters'];
				}
				this.arm = response['arm'] ? response['arm'] : "";
				this.user_detail = response['data'].hasOwnProperty('user_detail') && response['data'].user_detail;
				this.currentWeekInfo = response['data'].hasOwnProperty('week_info') && response['data'].week_info;
				
				this.currentWeek = response['data'].week_number;
				this.is_enable_questionnire = response['data'].enable_questionnire;
				if(Object.keys(response['quotes']).length)
					this.weekly_quotes = response['quotes'];
					// console.log(this.currentWeek);
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
			dataProvider: [{ value: this.incompleted_questionnaire, color: '#8934d4' }, { value: this.completed_questionnaire, color: '#dfdfdf' }],
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
			this.AmCharts.destroyChart(this.chart);
		}
	}

	viewAllAchivement()
	{

		if(this.currentWeek > 0)
		{
			this.router.navigate(['/achievements']);
		}else{
			this.toastr.error("Week not started yet");
		}

	}

}
