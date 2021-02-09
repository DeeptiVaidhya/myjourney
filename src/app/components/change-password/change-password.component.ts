import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
		'is_not_symbol': false,
		'is_number': false
	}
	allowed_symbol = "$@!%*?&";
	passType:any='password';
	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		public toastr: ToastrService,
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
						// Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/),
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
			this.form.addControl('access_code', new FormControl('', Validators.required));
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
			this.authService.reset_password_code(data).subscribe(
				result => {
					const response = result;
					if (response['status'] === 'error') {
						this.router.navigate(['/home']).then(() => {
							this.toastr.success(response['msg'] || 'Change password link has been expired');
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
		let allowed_char_flag = this.check_password_validaty();
		setTimeout(()=>{    //<<<---    using ()=> syntax
		      if (this.form.valid && allowed_char_flag) {
				const input = JSON.parse(JSON.stringify(this.form.value));
				input.code = this.code;
				input.password = encodeURIComponent(this.form.value['password']);
				input.confirm_password = encodeURIComponent(this.form.value['confirm_password']);

				this.authService.change_password(input).subscribe(
					result => {
						this.data = result;
						if (this.data.status === 'success') {
							this.is_success = true;
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
		 }, 1000);
		
	}

	check_password_validaty() {
		let p = this.is_password_valid;

		if (p.is_not_symbol) {
			let error = 'Allowed special characters are ' + this.allowed_symbol + ' only.';
			this.toastr.error(error);
			this.is_password_valid.is_symbol = !1;
		}

		return (p.is_length && p.is_space && p.is_capital && p.is_small && p.is_symbol && p.is_number && !p.is_not_symbol);
	}


	checkPassword(password) {
		this.is_password_valid = {
			'is_length': !(password.length < 8),
			'is_space': !(/\s/g.test(password)),
			'is_capital': (/[A-Z]/g.test(password)),
			'is_small': (/[a-z]/g.test(password)),
			'is_symbol': (/[$@!%*?&]/g.test(password)),
			'is_not_symbol': (/[\\" "#'()+,-./:;<=>[\]^_`{|}~]/g.test(password)),
			'is_number': (/\d/g.test(password))
		}

		if (this.is_password_valid.is_not_symbol) {
			this.is_password_valid.is_symbol = !1;
		}
	}

	showPassword(evt){
		this.passType=evt.target.checked?'text':'password';
	}
}
