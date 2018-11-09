import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../../service/data.service';

@Component({
	selector: 'app-understanding-breast-cancer',
	templateUrl: './understanding-breast-cancer.component.html',
	styleUrls: ['./understanding-breast-cancer.component.css'],
})
export class UnderstandingBreastCancerComponent implements OnInit, OnDestroy {
	breadcrumb = [
		{ link: '/patient/dashboard', title: 'Home' },
		{ title: 'Understanding breast cancer', class: 'active' },
	];
	@ViewChild('res0') res0: ElementRef;
	@ViewChild('res1') res1: ElementRef;
	

	constructor(private dataService:DataService) {
		
	}

	ngOnInit() {
		this.dataService.currentMessage.subscribe(param => {
			// console.log(param);
			let obj:any = param;
			if(obj && obj['scrollTo']){
				switch(obj.scrollTo){
					case '#res0':
						this.res0['isOpen']=true;
						break;
					case '#res1':
						this.res1['isOpen']=true;
						break;
				}
				setTimeout(()=>{
					document.querySelector(obj.scrollTo).scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
				},10);
				// this.dataService.changeMessage(null);
			}

		});
	}

	ngOnDestroy(){
		this.dataService.changeMessage(null);
	}
}
