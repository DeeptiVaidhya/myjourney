import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../service/auth.service';

@Component({
	selector: 'app-contact-us',
	templateUrl: './contact-us.component.html',
	styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
	public form: FormGroup;
	breadcrumb = [{ link: '/', title: 'Home' }, { link: '/Contact us',class:'active' }];

	constructor(private router: Router, private authService: AuthService, public toastr: ToastrService) { }

	ngOnInit() {
		// form validations
		this.form = new FormGroup(
			{
				name: new FormControl('', {
					validators: [Validators.required],
				}),
				email: new FormControl('', {
					validators: [
						Validators.required,
						Validators.pattern(
							/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
						),
					],
				}),
				telephone: new FormControl('', {
					validators: [
						Validators.required,
						Validators.pattern(
							'[0-9]{0,14}$'
						),
					],
				}),
				message: new FormControl('', {
					validators: [Validators.required],
				}),
			},
			{ updateOn: 'blur' }
		);
	}


	// Send Contactus data
	send() {
		if (this.form.valid) {
			this.authService.contact_us(this.form.value).subscribe(
				result => {
					const response = result;
					if (response['status'] === 'success') {
						this.router.navigate(['/home']).then(() => {
							this.toastr.success(response['msg']);
						});
					} else {
						this.toastr.error(response['msg']);
					}
				},
				err => {
					console.log(err);
				}
			);
		}
	}

}
