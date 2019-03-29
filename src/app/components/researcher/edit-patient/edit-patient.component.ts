import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
// import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../service/auth.service';

@Component({
	selector: 'app-edit-patient',
	templateUrl: './edit-patient.component.html',
	styleUrls: ['./edit-patient.component.css'],
})
export class EditPatientComponent implements OnInit {
	data: any;
	// uploader: FileUploader;
	patient_detail: any = [];
	save_patient_data: any = [];
	user_id: any;
	provider_list: any;
	cancer_list: any;
	is_unique_email: Boolean = true;
	is_unique_email_msg = '';
	// is_valid_file: Boolean = true;
	is_unique_subject_id_msg = '';
	is_unique_subject_id: Boolean = true;
	invalid_error_msg = '';
	minDate: Date;
	is_questionnaire_started = false;
	// genomic_report_detail: Object = {
	// 	'genomic_report': '',
	// 	'original_name': ''
	// };

	breadcrumb : any;


	public editPatientForm: FormGroup;
	constructor(
		private route: ActivatedRoute,
		private authService: AuthService,
		public toastr: ToastrService,
	) {
		this.minDate = new Date();
		this.route.params.subscribe(params => {
			this.user_id = params.user_id;
			this.breadcrumb = [{ link: '/researcher/dashboard', title: 'Home' } , { link: '/researcher/patients', title: 'Patients' }, { link:'/researcher/patient-details/'+this.user_id, title: 'Patient Details' }, { title: 'Edit Patient',class:'active' }];
		});
		
	}

	ngOnInit() {
		// Intialize uploader
		// this.uploader = new FileUploader({
		// 	url: CONSTANTS.API_ENDPOINT + 'user/upload-document',
		// 	headers: [{ name: 'Authorization', value: 'Basic ' + CONSTANTS.AUTH }],
		// });

		this.editPatientForm = new FormGroup(
			{
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
				genomic_test_start_date: new FormControl('')
				// genomic_report: new FormControl(''),
			},
			{ updateOn: 'blur' }
		);
		// Get cancer list
		this.getCancerList();
	}

	// get User Data
	getUserDetail() {
		const input = { user_type: 4, user_id: this.user_id };
		this.authService.getUserDetail(input).subscribe(
			result => {
				this.data = result;
				if (this.data.status === 'success') {
					this.patient_detail = this.data.data[0];
					this.save_patient_data = JSON.parse(JSON.stringify(this.patient_detail));
					this.is_questionnaire_started = this.patient_detail.is_questionnaire_started;
					// this.genomic_report_detail = {
					// 	'genomic_report': this.save_patient_data['genomic_profile_report'],
					// 	'original_name': this.save_patient_data['genomic_profile_report_name']
					// };
				}
			},
			err => {
				console.log(err);
			}
		);
	}

	// Get Provider Data
	getProviders() {
		this.authService.getUser(3).subscribe(
			result => {
				this.data = result;
				if (this.data.status === 'success') {
					this.provider_list = this.data.data;
					// Finally cal user details
					this.getUserDetail();
					//console.log(this.patient_detail);
				}
			},
			err => {
				console.log(err);
			}
		);
	}

	// Get Cancer Data
	getCancerList() {
		this.authService.getCancerList().subscribe(
			result => {
				this.data = result;
				//console.log(this.data);
				if (this.data.status === 'success') {
					this.cancer_list = this.data.data;
					// Get provider list
					this.getProviders();
				}
			},
			err => {
				console.log(err);
			}
		);
	}

	// Check Email is exits or not
	isEmailUnique(email) {
		if (this.editPatientForm.controls['email'].valid) {
			const email_info = { current_email: email, previous_email: this.save_patient_data['email'] };
			this.authService.isEmailUnique(email_info).subscribe(
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
		if (this.editPatientForm.controls['subject_id'].valid) {
			const subject_info = {
				current_subject_id: subjectId,
				previous_subject_id: this.save_patient_data['subject_id'],
			};
			this.authService.isSubjectIdUnique(subject_info).subscribe(
				response => {
					const result = response;
					this.is_unique_subject_id = result['status'] !== 'success';
					this.is_unique_subject_id_msg = !this.is_unique_subject_id
						? 'This Subject Id is already taken.'
						: '';
				},
				err => {}
			);
		}
	}

	ngAfterViewInit() {
		// this.uploader.onAfterAddingFile = item => {
		// 	item.withCredentials = false;
		// };
		// this.uploader.onSuccessItem = (item, response, status, headers) =>
		// 	this.onSuccessItem(item, response, status, headers);
	}

	// onSuccessItem(item, response, status, headers): any {
	// 	const data = JSON.parse(response);
	// 	if (data.status === 'success') {
	// 		const file_data = data.data;
	// 		// this.genomic_report_detail = {
	// 		// 	'genomic_report': file_data['file_name'],
	// 		// 	'original_name': file_data['client_name']
	// 		// };
	// 		// (<HTMLInputElement>document.getElementById('genomic_report')).value = this.genomic_report_detail['original_name'];
	// 		// this.is_valid_file = true;
	// 		this.invalid_error_msg = '';
	// 	} else {
	// 		// this.is_valid_file = false;
	// 		this.invalid_error_msg = data.data;
	// 	}
	// }

	updatePatientInfo() {
		if (this.editPatientForm.valid) {
			const inputs = this.editPatientForm.value;
			inputs.user_type = 4;
			inputs.previous_email = this.save_patient_data['email'];
			inputs.user_id = this.save_patient_data['user_id'];
			// inputs.genomic_test_start_date = this.datePipe.transform(inputs.genomic_test_start_date, 'MM-dd-yyyy');
			// inputs.genomic_report = this.genomic_report_detail;
			console.log(inputs);
			this.authService.updateUser(inputs).subscribe(
				result => {
					this.data = result;
					if (this.data.status === 'success') {
						this.getUserDetail();
						this.toastr.success(this.data.msg);
						window.scrollTo(0, 0);
					} else {
						this.toastr.error(this.data.msg);
						console.log(this.data);
					}
				},
				err => {
					console.log(err);
				}
			);
		}
	}

	// deleteGenomicReport() {
	// 	const inputs = {
	// 		'user_id': this.save_patient_data['user_id'],
	// 		'genomic_report': this.save_patient_data['genomic_profile_report']
	// 	};
	// 	this.authService.delete_genomic_report_user(inputs).then(
	// 		result => {
	// 			this.data = result;
	// 			if (this.data.status === 'success') {
	// 				this.genomic_report_detail = {
	// 					'genomic_report': '',
	// 					'original_name': ''
	// 				};
	// 				this.patient_detail['genomic_profile_report'] = null;
	// 				this.patient_detail['genomic_profile_report_name'] = null;
	// 				this.toastr.success(this.data.msg);
	// 			} else {
	// 				this.toastr.error(this.data.msg);
	// 			}
	// 		},
	// 		err => {
	// 			console.log(err);
	// 		}
	// 	);
	// }
}
