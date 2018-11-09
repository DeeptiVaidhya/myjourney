import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-inner-page-header',
	templateUrl: './inner-page-header.component.html',
	styleUrls: ['./inner-page-header.component.css'],
})
export class InnerPageHeaderComponent implements OnInit {
	constructor() {}
	@Input() page_title;
	role = '';
	ngOnInit() {
		// console.log(this.breadcrumb);
		// if (this.back_title.toLowerCase() == 'home') {
		// 	this.back_title = 'Dashboard';
		// 	localStorage.getItem('role') && (this.role = localStorage.getItem('role'));
		// 	switch (this.role) {
		// 		case '2':
		// 			this.back_link = '/researcher/dashboard';
		// 			break;
		// 		case '3':
		// 			this.back_link = '/provider/dashboard';
		// 			break;
		// 		case '4':
		// 			this.back_link = '/patient/dashboard';
		// 			break;
		// 		default:
		// 			this.back_link = '/home';
		// 			this.back_title = 'Home';
		// 			break;
		// 	}
		// }
	}
}
