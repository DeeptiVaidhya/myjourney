import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';

@Component({
	selector: 'app-list-providers',
	templateUrl: './list-providers.component.html',
	styleUrls: ['./list-providers.component.css']
})
export class ListProvidersComponent implements OnInit {

	constructor(private authService: AuthService) { }
	data: any;
	provider_list: any = [];
	role: any;
	breadcrumb = [{ link: '/researcher/dashboard', title: 'Home' }, { title: 'Providers',class:'active' }];

	ngOnInit() {
		localStorage.getItem('role') && (this.role = localStorage.getItem('role'));
		this.getProviders();
	}


	// Save Provider Data
	getProviders() {
		this.authService.getUser(3).then(
			result => {
				this.data = result;
				console.log(this.data);
				if (this.data.status === 'success') {
					this.provider_list = this.data.data;
					console.log(this.provider_list);
				}
			},
			err => {
				console.log(err);
			}
		);

	}

}
