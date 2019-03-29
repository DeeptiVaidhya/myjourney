import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../service/auth.service';

@Component({
	selector: 'app-add-provider',
	templateUrl: './add-provider.component.html',
	styleUrls: ['./add-provider.component.css']
})
export class AddProviderComponent implements OnInit {
	public addProviderForm: FormGroup;
	data: any;
	is_unique_email: Boolean = false;
	is_unique_email_msg = '';
	breadcrumb = [{ link: '/researcher/dashboard', title: 'Home' }, { link: '/researcher/providers', title: 'Providers' }, { title: 'Add Provider',class:'active' }];

	constructor(private router: Router, private authService: AuthService, public toastr: ToastrService) { }

	ngOnInit() {
		// form validations
		this.addProviderForm = new FormGroup(
			{
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
			},
			{ updateOn: 'blur' }
		);
	}

	// Check Email is exits or not
	isEmailUnique(email) {
		if (this.addProviderForm.controls['email'].valid) {
			const email_info = { 'current_email': email };
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
					console.log(err);
				}
			);
		}
	}


	// Save Provider Data
	addProvider() {
		if (this.addProviderForm.valid && this.is_unique_email) {
			let inputs = this.addProviderForm.value;
			inputs.user_type = 3;
			this.authService.addUser(inputs).subscribe(
				result => {
					this.data = result;
					if (this.data.status === 'success') {
						this.router.navigate(['researcher/providers']).then(() => {
							this.toastr.success(this.data.msg);
						});
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
}
