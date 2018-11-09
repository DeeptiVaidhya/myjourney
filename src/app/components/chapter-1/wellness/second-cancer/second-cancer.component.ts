import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../../service/data.service';


@Component({
	selector: 'app-second-cancer',
	templateUrl: './second-cancer.component.html',
	styleUrls: ['./second-cancer.component.css'],
})
export class SecondCancerComponent implements OnInit {
	breadcrumb = [
		{ link: '/patient/dashboard', title: 'Home' },
		{ title: 'Understanding breast cancer', link: '/patient/dashboard/understanding-breast-cancer' },
		{ title: 'Wellness and Prevention',params:{scrollTo:'#res1'} },
		{ title: 'Second cancers after breast cancer', class: 'active' },
	];
	constructor(private router:Router,private dataService:DataService) {}
	goToElem(obj) {
		this.dataService.changeMessage(obj);
		this.router.navigate(['/patient/dashboard/understanding-breast-cancer']);	
	}

	ngOnInit() {}
}
