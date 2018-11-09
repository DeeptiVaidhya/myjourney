import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-terms-conditions',
	templateUrl: './terms-conditions.component.html',
	styleUrls: ['./terms-conditions.component.css'],
})
export class TermsConditionsComponent implements OnInit {
	breadcrumb = [{ link: '/home', title: 'Home' }, { title: 'Terms & Conditions', class: 'active' }];

	constructor() {}

	ngOnInit() {}
}
