import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../service/auth.service';

@Component({
	selector: 'app-patient-details',
	templateUrl: './patient-details.component.html',
	styleUrls: ['./patient-details.component.css'],
})
export class PatientDetailsComponent implements OnInit {
	data: any;
	patient_detail: any = [];
	user_id: any;
	role: any;
	breadcrumb:any;
	constructor(private route: ActivatedRoute, private authService: AuthService, public toastr: ToastrService) {
		this.route.params.subscribe(params => (this.user_id = params.user_id));
		localStorage.getItem('role') && (this.role = localStorage.getItem('role'));
		this.breadcrumb = [{ link: this.role==2 ? ['/researcher/dashboard'] : ['/provider/dashboard'] , title: 'Home' }, { link: this.role==2 ? ['/researcher/patients'] : ['/provider/patients'] , title: 'Patients' }, { title: 'Patient Details',class:'active' }]
	}

	ngOnInit() {
		this.getUserDeatail();
	}

	// get Provider Data
	getUserDeatail() {
		const input = { user_type: 4, user_id: this.user_id };
		this.authService.getUserDetail(input).subscribe(
			result => {
				this.data = result;
				console.log(this.data);
				if (this.data.status === 'success') {
					if (this.data.data.length > 0) {
						this.patient_detail = this.data.data[0];
						this.patient_detail.fullname =
							this.patient_detail.first_name + ' ' + this.patient_detail.last_name;
					}
				}
			},
			err => {
				console.log(err);
			}
		);
	}

	resetPassword(email) {
		this.authService.forgot_password({email:email}).subscribe(
			result => {
				this.data = result;
				if (this.data.status === 'success') {
					this.toastr.success('A link has been sent to email '+email);
				} else {
					this.toastr.error('Error in sending reset password link');
					console.log(this.data);
				}
			},
			err => {
				console.log(err);
			}
		);
	}
	generateAccessCode(email) {
		this.authService.generate_access_code({email:email}).subscribe(
			result => {
				this.data = result;
				if (this.data.status === 'success') {
					this.toastr.success('Generated access code is ' +this.data.access_code );
				} else {
					this.toastr.error('Error in sending reset password link');
					console.log(this.data);
				}
			},
			err => {
				console.log(err);
			}
		);
	}

	changeActiveStatus(user_id,status) {
		status = ( status == 0) ? 1 : 0;
		this.authService.change_active_status({user_id:user_id,status:status}).subscribe(
			result => {
				this.data = result;
				if (this.data.status === 'success') {
					this.toastr.success('Patient updated successfully.');
					this.patient_detail.is_active = status;
				} else {
					this.toastr.error('Error in change status');
					console.log(this.data);
				}
			},
			err => {
				console.log(err);
			}
		);
	}
}
