import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../service/data.service';

@Component({
	selector: 'app-breast-cancer-treatment',
	templateUrl: './breast-cancer-treatment.component.html',
	styleUrls: ['./breast-cancer-treatment.component.css'],
})
export class BreastCancerTreatmentComponent implements OnInit {
	breadcrumb = [
		{ link: '/patient/dashboard', title: 'Home' },
		{ title: 'Understanding breast cancer', link: '/patient/dashboard/understanding-breast-cancer' },
		{ title: 'Breast Cancer & HT Education',params:{scrollTo:'#res0'} },
		{ title: 'Types of treatment for breast cancer', class: 'active' },
	];
	constructor(private router:Router,private dataService:DataService) {}
	goToElem(obj) {
		this.dataService.changeMessage(obj);
		this.router.navigate(['/patient/dashboard/understanding-breast-cancer']);	
	}

	ngOnInit() {}
}
