import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../service/auth.service';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
	form: FormGroup;
	is_unique_email: Boolean = false;
	is_unique_email_msg = '';
	is_success = false;
	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		public toastr: ToastrService,
		private router: Router) { }

	ngOnInit() {
		this.form = this.formBuilder.group(
			{
				email: new FormControl('', {
					validators: [
						Validators.required,
						Validators.pattern(
							/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
						),
					],
				}),
			},
			{
				updateOn: 'blur'
			}
		);
	}

	// Check Email is exits or not
	isEmailUnique(email) {
		if (this.form.controls['email'].valid) {
			const email_info = { current_email: email };
			this.authService.isEmailUnique(email_info).subscribe(
				response => {
					this.is_unique_email = response['status'] == 'success';
					this.is_unique_email_msg = !this.is_unique_email ? 'This Email address does not exist in system..' : '';
				},
				err => {
					console.log(err);
				}
			);
		}
	}



	forgotPassword() {
		if (this.form.valid && this.is_unique_email) {
			this.authService.forgot_password(this.form.value).subscribe(
				result => {
					const response = result;
					this.is_success = response['status'] !== 'error'
				},
				err => {
					console.log(err);
				}
			);
		}
	}

}
