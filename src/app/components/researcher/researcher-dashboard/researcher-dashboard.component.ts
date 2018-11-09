import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AuthService } from '../../../service/auth.service';

@Component({
	selector: 'app-researcher-dashboard',
	templateUrl: './researcher-dashboard.component.html',
	styleUrls: ['./researcher-dashboard.component.css'],
})
export class ResearcherDashboardComponent implements OnInit {
	@ViewChild(ModalDirective) modal: ModalDirective;
	user_detail: any = [];
	role: any;
	dmodal = {
		pp_name: '',
		pp_email: '',
		sp_name: '',
		sp_email: '',
		p_name: '',
		report_date: '',
		symptoms: ''
	}
	elevated_users: any = [];
	constructor(private authService: AuthService, private toastr: ToastsManager) { }

	ngOnInit() {
		localStorage.getItem('role') && (this.role = localStorage.getItem('role'));
		this.getElevatedPatients();
	}
	/**
	 * @desc Showing pop up on clicking to Copy link
	 * @param event 
	 * @param ep 
	 */
	emailPopUp(event, ep) {
		console.log(ep);
		this.dmodal = {
			pp_name: ep.primary_provider,
			pp_email: ep.primary_provider_email,
			sp_name: ep.secondary_provider,
			sp_email: ep.secondary_provider_email,
			p_name: ep.patient_name,
			report_date: ep.completion_date,
			symptoms: ep.question_group,
		}
		this.modal.show();
	}


	/**
	 * @desc Get list of all patients having elevated symptoms, and mail not sent to them yet.
	 */
	getElevatedPatients() {
		this.authService.getElevatedPatients().then(
			response => {
				const result = response;
				console.log(response);
				if (result['status'] === 'success') {
					this.elevated_users = result['data'];
					this.user_detail = result['user_detail'];
				}
			},
			err => { }
		);
	}
	// Date issue in iOS, Safari browsers.
	// https://github.com/angular/angular/issues/14984
	format_date(dt){
		return new Date(dt.replace(/-/g, "/"));
	}

	sendEmail() {
		let inputs = document.querySelectorAll('[name="option[]"]:checked');
		const data = [];
		for (let i = 0, l = inputs.length; i < l; i++) {
			data.push((<HTMLInputElement>inputs[i]).value);
		}

		console.log(data);
		if (!data.length) {
			this.toastr.error("No patients selected from list..");
			return false;
		}
		this.authService.elevatedSymptomsSendMail({ week_ids: data }).then(
			response => {
				const result = response;
				console.log(response);
				if (result['status'] === 'success') {
					this.toastr.success(result['msg']);
					this.getElevatedPatients();
				} else {
					this.toastr.error("Error which changing status of patient's elevated symptom.");
				}
			},
			err => {
				console.log(err);
			}
		);
	}
}
