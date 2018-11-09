import { Component, OnInit } from '@angular/core';
import { CONSTANTS } from '../../../config/constants';
import { AuthService } from '../../../service/auth.service';

@Component({
	selector: 'app-list-patients',
	templateUrl: './list-patients.component.html',
	styleUrls: ['./list-patients.component.css']
})
export class ListPatientsComponent implements OnInit {

	constructor(private authService: AuthService) { }
	data: any;
	patients_list: any = [];
	role: any;
	breadcrumb:any;

	ngOnInit() {
		localStorage.getItem('role') && (this.role = localStorage.getItem('role'));
		this.breadcrumb = [{ link: this.role==2 ? ['/researcher/dashboard'] : ['/provider/dashboard'], title: 'Home' }, { title: 'Patients',class:'active' }]
		this.getPatients();
	}

	// get Provider Data
	getPatients() {
		this.authService.getUser(4,this.role == 2).then(
			result => {
				this.data = result;
				console.log(this.data);
				if (this.data.status === 'success') {
					this.patients_list = this.data.data;
				}
			},
			err => {
				console.log(err);
			}
		);

	}

	export_report() {
		const token = localStorage.getItem('token');
		window.open(CONSTANTS.API_ENDPOINT + 'export/export_questionnaire?code=' + token);

	}
	export_tracking_report() {
		const token = localStorage.getItem('token');
		window.open(CONSTANTS.API_ENDPOINT + 'export/user_activity_report?code=' + token);
	}

}
