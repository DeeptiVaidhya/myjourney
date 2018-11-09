import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../service/data.service';


@Component({
	selector: 'app-colorectal-cancer-screening',
	templateUrl: './colorectal-cancer-screening.component.html',
	styleUrls: ['./colorectal-cancer-screening.component.css'],
})
export class ColorectalCancerScreeningComponent implements OnInit {
	breadcrumb = [
		{ link: '/patient/dashboard', title: 'Home' },
		{ title: 'Understanding breast cancer', link: '/patient/dashboard/understanding-breast-cancer' },
		{ title: 'Wellness and Prevention',params:{scrollTo:'#res1'}},
		{ title: 'Screening for colorectal cancer', class: 'active' },
	];
	constructor(private router:Router,private dataService:DataService) {}
	goToElem(obj) {
		this.dataService.changeMessage(obj);
		this.router.navigate(['/patient/dashboard/understanding-breast-cancer']);	
	}

	ngOnInit() {}
}
