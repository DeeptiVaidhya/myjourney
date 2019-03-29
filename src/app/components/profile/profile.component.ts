import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../service/auth.service';
@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	profileForm: FormGroup;
	data: any;
	error_message: any[];
	is_unique_email: Boolean = true;
	is_current_password: Boolean = true;
	is_unique_email_msg = '';
	is_current_password_msg = '';
	loading: any;
	user_detail: any = [];
	save_user_data: any = [];
	previous_email: any;
	username: any;
	is_previous_password: Boolean = true;
	is_previous_password_msg = '';
	breadcrumb = [{ link: '/', title: 'Home' }, { title: 'My Details', class:'active' }];

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		public toastr: ToastrService
	) { }



	ngOnInit() {
		this.getUserProfile();
		this.profileForm = this.formBuilder.group(
			{
				first_name: [
					this.user_detail['first_name'],
					Validators.compose([Validators.pattern('[a-zA-Z]*'), Validators.required]),
				],
				last_name: [
					this.user_detail['last_name'],
					Validators.compose([Validators.pattern('[a-zA-Z]*'), Validators.required]),
				],
				email: [
					this.user_detail['email'],
					Validators.compose([
						Validators.pattern(
							/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
						),
						Validators.required,
					]),
				],
				current_password: [''],
				password: [
					'',
					Validators.compose([
						Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/),
					]),
				],
				confirm_password: ['']
			},
			{
				validator: this.match_password
			}
		);

	}


	match_password(g: FormGroup) {
		return g.get('password').value === g.get('confirm_password').value
			? null : { 'match_password': true };
	}


	// Check Current Password
	isCurrentPassword(password) {
		if (this.profileForm.controls['password'].valid && password != '') {
			const password_info = {
				password: password,
			};
			this.authService.isCurrentPassword(password_info).subscribe(
				result => {
					this.data = result;
					if (this.data.status === 'success') {
						this.is_current_password_msg = 'Incorrect current password.';
						this.is_current_password = false;
					} else {
						this.is_current_password_msg = '';
						this.is_current_password = true;
					}
				},
				err => {
					console.log(err);
				}
			);
		} else {
			this.is_current_password = true;
		}
	}


	// Check Previous Password
	isPreviousPassword(password) {
		if (this.profileForm.controls['password'].valid && password !== '') {
			const password_info = {
				password: password,
			};
			this.authService.isPreviousPassword(password_info).subscribe(
				result => {
					this.data = result;
					if (this.data.status === 'success') {
						this.is_previous_password_msg = 'Your password must be different from the previous 6 passwords.';
						this.is_previous_password = false;
					} else {
						this.is_previous_password_msg = '';
						this.is_previous_password = true;
					}
				},
				err => {
					console.log(err);
				}
			);
		} else {
			this.is_previous_password = true;
		}
	}



	// Check Email is exits or not
	isEmailUnique(email) {
		if (this.profileForm.controls['email'].valid) {
			const email_info = {
				'previous_email': this.save_user_data['email'],
				'current_email': email
			};
			this.authService.isEmailUnique(email_info).subscribe(
				response => {
					const result = response;
					if (result['status'] === 'success') {
						this.is_unique_email_msg = 'Email address already exits.';
						this.is_unique_email = false;
					} else {
						this.is_unique_email_msg = '';
						this.is_unique_email = true;
					}
				},
				err => {

				}
			);
		}
	}



	getUserProfile() {
		this.authService.get_profile().subscribe(
			response => {
				this.data = response;
				if (this.data.status === 'success') {
					this.user_detail = this.data.data;
					this.save_user_data = JSON.parse(JSON.stringify(this.user_detail));

				}
			},
			err => {
				console.log(err);
			}
		);
	}

	updateProfile() {
		if (this.profileForm.valid && this.is_unique_email && this.is_current_password && this.is_previous_password) {
			this.profileForm.value['previous_username'] = this.save_user_data['username'];
			this.profileForm.value['previous_email'] = this.save_user_data['email'];
			// console.log(this.profileForm.value);
			this.authService.update_profile(this.profileForm.value).subscribe(
				result => {
					this.data = result;
					if (this.data.status === 'success') {
						this.toastr.success(this.data.msg);
						this.getUserProfile();
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


}
