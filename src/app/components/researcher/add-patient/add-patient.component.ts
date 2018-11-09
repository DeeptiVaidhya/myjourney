import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
//import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
//import { CONSTANTS } from '../../config/constants';
import { AuthService } from '../../../service/auth.service';

@Component({
	selector: 'app-add-patient',
	templateUrl: './add-patient.component.html',
	styleUrls: ['./add-patient.component.css'],
})
export class AddPatientComponent implements OnInit {
	//uploader: FileUploader;
	data: any;
	provider_list: any;
	cancer_list: any;
	public addPatientForm: FormGroup;
	is_unique_email: Boolean = false;
	is_unique_email_msg = '';
	is_unique_subject_id: Boolean = false;
	is_unique_subject_id_msg = '';
	invalid_error_msg = '';
	minDate: Date;
	breadcrumb = [{ link: '/researcher/dashboard', title: 'Home' }, { link: '/researcher/patients', title: 'Patients' }, { title: 'Add Patient',class:'active' }];
	constructor(
		private router: Router,
		private authService: AuthService,
		public toastr: ToastsManager
	) { 
		this.minDate = new Date();
	}

	ngOnInit() {
		this.addPatientForm = new FormGroup({
			subject_id: new FormControl('', {
				validators: [Validators.required, Validators.pattern('[0-9]*')],
			}),
			first_name: new FormControl('', {
				validators: [Validators.required, Validators.pattern('[a-zA-Z]*')],
			}),
			last_name: new FormControl('', {
				validators: [Validators.required, Validators.pattern('[a-zA-Z]*')],
			}),
			email: new FormControl('', {
				validators: [
					Validators.required,
					Validators.pattern(
						/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
					),
				],
			}),
			gender: new FormControl('female', { validators: [Validators.required] }),
			cancer_type: new FormControl('', {
				validators: [Validators.required],
			}),
			primary_provider: new FormControl('', {
				validators: [Validators.required],
			}),
			secondary_provider: new FormControl('', {
				validators: [Validators.required],
			}),
			genomic_test_start_date: new FormControl(''),
			// genomic_report: new FormControl(''),
		},
			{ updateOn: 'blur' }
		);
		// Get provider list
		this.getProviders();

		// Get cancer list
		this.getCancerList();
	}

	// Check Email is exits or not
	isEmailUnique(email) {
		if (this.addPatientForm.controls['email'].valid) {
			const email_info = { current_email: email };
			this.authService.isEmailUnique(email_info).then(
				response => {
					this.is_unique_email = response['status'] !== 'success';
					this.is_unique_email_msg = !this.is_unique_email ? 'This Email Id is already taken.' : '';
				},
				err => {
					console.log(err);
				}
			);
		}
	}

	/**
	 * @desc Validation function to check if a Subject Id is taken or not for a patient
	 * @param subjectId 
	 */
	isSubjectIdUnique(subjectId) {
		if (this.addPatientForm.controls['subject_id'].valid) {
			this.authService.isSubjectIdUnique({ current_subject_id: subjectId }).then(
				response => {
					this.is_unique_subject_id = response['status'] !== 'success';
					this.is_unique_subject_id_msg = !this.is_unique_subject_id ? 'This Subject Id is already taken.' : '';
				},
				err => { }
			);
		}
	}



	// Get Provider Data
	getProviders() {
		this.authService.getUser(3).then(
			result => {
				this.data = result;
				console.log(this.data);
				if (this.data.status === 'success') {
					this.provider_list = this.data.data;
				}
			},
			err => {
				console.log(err);
			}
		);
	}

	// Get Cancer Data
	getCancerList() {
		this.authService.getCancerList().then(
			result => {
				this.data = result;
				console.log(this.data);
				if (this.data.status === 'success') {
					this.cancer_list = this.data.data;
				}
			},
			err => {
				console.log(err);
			}
		);
	}

	addPatient() {
		if (this.addPatientForm.valid && this.is_unique_email && this.is_unique_subject_id) {
			let inputs = this.addPatientForm.value;
			inputs.user_type = 4;
			//inputs.genomic_report = this.genomic_report_detail;
			this.authService.addUser(inputs).then(
				result => {
					this.data = result;
					if (this.data.status === 'success') {
						this.router.navigate(['researcher/patients']).then(() => {
							this.toastr.success(this.data.msg, null, { showCloseButton: true });
						});
					} else {
						this.toastr.error(this.data.msg, null, { showCloseButton: true });
						console.log(this.data);
					}
				},
				err => {
					console.log(err);
				}
			);
		}
	}
}
