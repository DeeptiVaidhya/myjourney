import { AmChartsService } from '@amcharts/amcharts3-angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'assets/js/gauge.js';
import 'assets/js/serial.js';
import { AuthService } from '../../service/auth.service';


@Component({
	selector: 'app-report',
	templateUrl: './report.component.html',
	styleUrls: ['./report.component.css'],
})
export class ReportComponent implements OnInit {
	proctcae_report: any = [];
	promis_report: any = [];
	promis_report_charts: any = [];
	fact_g7_report: any = [];
	ies_report: any = [];
	cps_report: any = [];
	current_week: any;
	user_detail: any = [];
	path = '/patient/dashboard';
	patient_name = 'Your Report';
	user_id: any;
	link_name = 'Dashboard';
	role: any;
	promis_complete_date: any;
	breadcrumb = [{ link: '/patient/dashboard', title: 'Home' }, { title: 'My Report', class:'active' }];

	constructor(private authService: AuthService, private route: ActivatedRoute, private AmCharts: AmChartsService) {
		this.route.params.subscribe(params => {
			this.user_id = params.user_id;
		});
	}

	ngOnInit() {
		this.getPatientReport();
		if (localStorage.getItem('token') && localStorage.getItem('role')) {
			this.role = localStorage.getItem('role');
			let type = '';
			switch (this.role) {
				case '2':
					this.link_name = 'Patient detail';
					this.path = '/researcher/patient-details/' + this.user_id;
					type = 'researcher';
					break;
				case '3':
					this.link_name = 'Patient detail';
					type = 'provider';
					this.path = '/provider/patient-details/' + this.user_id;
					break;
			}
			type && (this.breadcrumb = [{ link: '/'+type+'/dashboard', title: 'Home' } , { link: '/'+type+'/patients', title: 'Patients' }, { link:'/'+type+'/patient-details/'+this.user_id, title: 'Patient Details' }, { title: 'Report',class:'active' }]);
		}
	}
	print(elem): void {
		let printContents, popupWin;
		printContents = document.getElementById(elem).innerHTML;
		popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
		popupWin.document.open();
		popupWin.document.write(`
		  <html>
			<head>
				<title>${this.user_detail.fullname ? this.user_detail.fullname : 'Your'} Report</title>
				<style type="text/css">.dash-tbl-list{padding-bottom: 15px;}.dash-tbl-list thead tr {background-color: #ccedf5;}.dash-tbl-list thead>tr>th{padding:8px 15px;font-size: 20px;color: #00a7ce;text-align: left;border: 0 none;}.dash-tbl-list tbody>tr>td{padding:20px 15px;font-size: 16px;color: #565b61;text-align: left;border-top: 0 none;border-bottom: 1px solid #e6edf0;font-family: 'Montserrat-Regular';}.dash-tbl-list tbody>tr>td:first-child{width: 25%}.dash-tbl-list tbody>tr>td:first-child span{font-size: 14px;}.doctor-content-bg{float: left;width: 100%;background-color: #f7f9fa;padding: 40px 0;margin-bottom: 70px;}.doctor-img{width: 118px;height: 118px;border-radius: 50%;}[class^="col-"]{float:left;position:relative}.col-xs-12,table{width:100%}.col-xs-10{width:50%}.col-sm-4{width:50%}.col-md-3{width:50%}.text-uppercase{text-transform:uppercase}</style>
			</head>
			<body onload="window.print();window.close()"><h1>${this.user_detail.fullname}</h1><p>${printContents}</p></body>
		  </html>`);
		popupWin.document.close();
	}

	/**
	 * @desc Get list of all patients having elevated symptoms, and mail not sent to them yet.
	 */
	getPatientReport() {
		this.authService.get_patient_report(this.user_id).then(
			response => {
				const result = response;
				console.log(response);
				if (result['status'] === 'success') {
					this.proctcae_report = result['data']['result']['proctcae_report'];
					this.promis_report = result['data']['result']['promis_report']['promis_data'];
					this.promis_complete_date = result['data']['result']['promis_report']['promis_complete_date'];
					this.fact_g7_report = result['data']['result']['fact_g7_report'];
					if (this.role != 4) {
						// Make all five gauges to go from 0 to 100 (not 120).
						// For pain, fatigue, depression, and anxiety, make the green band to go from 0 to 50, yellow from 50 to 70, and red from 70 to 100.
						// For physical (I hope this is possible), make the red band to go from 0 to 30, yellow from 30 to 50, and green from 50 to 100.
						let guages = document.getElementById('guages');
						for (let id, i = 0, pr = this.promis_report, l = pr.length; i < l; i++) {
							id = pr[i].type.toLowerCase().replace(/\s+/g, '-');
							let iDiv = document.createElement('div'),
								iDivGraph = document.createElement('div');
							iDivGraph.id = id;
							iDiv.className = 'col-xs-10 col-sm-4 col-md-4 text-center';
							iDivGraph.style.height = '200px';
							iDiv.appendChild(iDivGraph);
							iDiv.innerHTML +=
								'<span class="promis-status tag ' +
								(pr[i].status.indexOf('Severe') != -1 ? '' : 'not-') +
								'severe">' +
								pr[i].status +
								'</span>';
							guages.appendChild(iDiv);

							//console.log('promis-' + id);
							let bands = [
								[
									{
										color: '#84b761',
										endValue: 50,
										startValue: 0,
										innerRadius: '80%',
									},
									{
										color: '#fdd400',
										endValue: 70,
										startValue: 50,
										innerRadius: '80%',
									},
									{
										color: '#cc4748',
										endValue: 100,
										innerRadius: '80%',
										startValue: 70,
									},
								],
								[
									{
										color: '#cc4748',
										endValue: 30,
										startValue: 0,
										innerRadius: '80%',
									},
									{
										color: '#fdd400',
										endValue: 50,
										startValue: 30,
										innerRadius: '80%',
									},
									{
										color: '#84b761',
										endValue: 100,
										innerRadius: '80%',
										startValue: 50,
									},
								],
							];
							this.promis_report_charts[i] = this.AmCharts.makeChart(id, {
								type: 'gauge',
								theme: 'light',
								fontFamily: 'Montserrat-Medium',
								axes: [
									{
										axisThickness: 1,
										axisAlpha: 0.2,
										tickAlpha: 0.2,
										valueInterval: 20,
										bands: id.indexOf('physical') !== -1 ? bands[1] : bands[0],
										bottomText: pr[i].type,
										bottomTextYOffset: 25,
										endValue: 100,
										bottomTextFontSize: 13,
									},
								],
								arrows: [{ value: pr[i].tscore }],
								export: {
									enabled: true,
								},
							});
							//console.log(this.promis_report_charts[i].arrows[0], pr[i].tscore);
						}

						let fact_g7 = this.AmCharts.makeChart('fact-g7-chart', {
							type: 'serial',
							categoryField: 'start_date',
							categoryAxis: {
								//minPeriod: 'MMM DD',
								//parseDates: true,
								axisColor: '#EEE',
							},
							graphs: [
								{
									balloonText:
										'<span style="font-size:13px">Score on <b>[[start_date]]</b> is <b>[[value]]</b></span>',
									bullet: 'round',
									bulletColor: '#e6742e',
									bulletSize: 12,
									id: 'AmGraph-1',
									title: 'FACT-G7',
									valueField: 'score',
									lineThickness: 2,
									lineColor: '#e6742e',
								},
							],
							valueAxes: [
								{
									axisAlpha: 10,
								},
							],
							legend: {
								enabled: false,
							},
							dataProvider: this.fact_g7_report.reverse(),
						});

						console.log(fact_g7);
					}

					this.ies_report = result['data']['result']['ies_report'];
					this.cps_report = result['data']['result']['cps_report'];
					this.current_week = result['data']['current_week'];
					this.user_detail = result['data']['user_detail'];
					this.patient_name = this.role !== '4' ? this.user_detail.fullname : 'Your Report';
				}
			},
			err => {}
		);
	}
}
