import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../service/auth.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
	lat: Number = 41.893838;
	lng: Number = -87.622379;
	styleArray = [
		{
			elementType: 'geometry',
			stylers: [
				{
					color: '#f5f5f5',
				},
			],
		},
		{
			elementType: 'labels.icon',
			stylers: [
				{
					visibility: 'off',
				},
			],
		},
		{
			elementType: 'labels.text.fill',
			stylers: [
				{
					color: '#616161',
				},
			],
		},
		{
			elementType: 'labels.text.stroke',
			stylers: [
				{
					color: '#f5f5f5',
				},
			],
		},
		{
			featureType: 'road',
			elementType: 'geometry',
			stylers: [
				{
					color: '#ffffff',
				},
			],
		},
		{
			featureType: 'water',
			elementType: 'geometry',
			stylers: [
				{
					color: '#9B77AB',
				},
			],
		},
	];
	public loginForm: FormGroup;
	data: any;

	constructor(
		private router: Router,
		private formBuilder: FormBuilder,
		private authService: AuthService,
		public toastr: ToastrService
	) {}

	ngOnInit() {
		this.loginForm = new FormGroup({
			username: new FormControl('', { validators: [Validators.required] }),
			password: new FormControl('', { validators: [Validators.required] }),
		});

		if (localStorage.getItem('token') && localStorage.getItem('role')) {
			const role = localStorage.getItem('role');
			let path = '/patient/dashboard';
			switch (role) {
				case '2':
					path = '/researcher/dashboard';
					break;
				// case '3':
				// 	path = '/provider/dashboard';
				// 	break;
				case '3':
					path = '/patient/dashboard';
					break;
			}
			this.router.navigate([path]);
			console.log(role);
		}
	}

	signIn() {
		if (this.loginForm.valid) {
			this.authService.login(this.loginForm.value).subscribe(
				result => {
					this.data = result;
					if (this.data.status === 'success') {
						localStorage.setItem('token', this.data.token);
						localStorage.setItem('role', this.data.role);
						localStorage.setItem('username', this.data.username);
						let path = '/patient/dashboard';
						switch (this.data.role) {
							case '2':
								path = '/researcher/dashboard';
								break;
							// case '3':
							// 	path = '/provider/dashboard';
							// 	break;
							case '3':
								path = '/patient/dashboard';
								break;
						}
						this.router.navigate([path]).then(() => {
							this.toastr.success(this.data.msg);
						});
					} else {
						this.toastr.error(this.data.msg);
					}
				},
				err => {}
			);
		}
	}

	scroll(el) {
		el.scrollIntoView({ behavior: 'smooth' });
	}
}
