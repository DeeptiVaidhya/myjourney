import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../service/data.service';


@Component({
	selector: 'app-what-is-breast-cancer',
	templateUrl: './what-is-breast-cancer.component.html',
	styleUrls: ['./what-is-breast-cancer.component.css'],
})
export class WhatIsBreastCancerComponent implements OnInit {
	breadcrumb = [
		{ link: '/patient/dashboard', title: 'Home' },
		{ title: 'Understanding breast cancer', link: '/patient/dashboard/understanding-breast-cancer' },
		{ title: 'Breast Cancer & HT Education',params:{scrollTo:'#res0'}},
		{ title: 'What is breast cancer?', class: 'active' },
	];
	constructor(private router:Router,private dataService:DataService) {}
	goToElem(obj) {
		this.dataService.changeMessage(obj);
		this.router.navigate(['/patient/dashboard/understanding-breast-cancer']);	
	}

	ngOnInit() {}
}
