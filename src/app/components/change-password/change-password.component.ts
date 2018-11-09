import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AuthService } from '../../service/auth.service';

@Component({
	selector: 'app-change-password',
	templateUrl: './change-password.component.html',
	styleUrls: ['./change-password.component.css']
})

export class ChangePasswordComponent implements OnInit {
	form: FormGroup;
	code: any;
	data: any;
	heading: String = '';
	is_success = false;
	is_invalid_code = false;
	is_password_valid: any = {
		'is_length': false,
		'is_space': false,
		'is_capital': false,
		'is_small': false,
		'is_symbol': false,
		'is_number': false
	}
	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		public toastr: ToastsManager,
		private route: ActivatedRoute,
		private router: Router,
	) {
		this.route.params.subscribe(params => this.code = params.code);
		if (this.router.url.indexOf('reset-password') === 1) {
			this.heading = 'Reset Password';
		}

		if (this.router.url.indexOf('create-password') === 1) {
			this.heading = 'Create Password';
		}
	}

	ngOnInit() {
		this.form = this.formBuilder.group(
			{
				password: ['',
					Validators.compose([
						Validators.required,
						Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/),
					]),
				],
				confirm_password: ['', {
					validators: [Validators.required],
				}]
			},
			{
				validator: this.match_password,
			}
		);
		if (this.code === undefined) {	
			this.form.addControl('access_code',new FormControl('', Validators.required) );
		}	
	

		// this.checkCode();

	}

	match_password(g: FormGroup) {
		return g.get('password').value === g.get('confirm_password').value
			? null : { 'match_password': true };
	}


	checkCode() {
		if (this.code !== undefined) {
			const data = { code: this.code };
			this.authService.reset_password_code(data).then(
				result => {
					const response = result;
					if (response['status'] === 'error') {
						this.router.navigate(['/home']).then(() => {
							this.toastr.success(response['msg'] || 'Change password link has been expired', null, { showCloseButton: true });
						});
					}
				},
				err => {
					console.log(err);
				}
			);
		} 
	}

	// checkAccessCode(access_code){
	// 	this.authService.checkAccessCode({access_code:access_code}).then(
	// 		result => {
	// 			let response:any = result;
	// 			this.is_invalid_code = response.status !== 'success';
	// 		},
	// 		err => {}
	// 	);
	// }

	save() {
		if (this.form.valid) {
			const input = this.form.value;
			input.code = this.code;
			this.authService.change_password(input).then(
				result => {
					this.data = result;
					if (this.data.status === 'success') {
						this.is_success = true;
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


	checkPassword(password) {
		this.is_password_valid = {
			'is_length': !(password.length < 8),
			'is_space': !(/\s/g.test(password)),
			'is_capital': (/[A-Z]/g.test(password)),
			'is_small': (/[a-z]/g.test(password)),
			'is_symbol': (/[$@$!%*?&]/g.test(password)),
			'is_number': (/\d/g.test(password))
		}
	}

}
