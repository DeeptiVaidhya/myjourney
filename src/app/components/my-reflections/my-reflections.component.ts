import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { DataService } from "../../service/data.service";
import { QuestionnaireService } from '../../service/questionnaire.service';
@Component({
	selector: 'app-my-reflections',
	templateUrl: './my-reflections.component.html',
	styleUrls: ['./my-reflections.component.css']
})
export class MyReflectionsComponent implements OnInit {
	moodOption = new Array<any>(
		{ title: 'Great', src: "assets/images/emoji-happy.png" },
		{ title: 'Good', src: "assets/images/emoji-blushing.png" },
		{ title: 'Neutral', src: "assets/images/emoji-speechless.png" },
		{ title: 'Average', src: "assets/images/emoji-smirk.png" },
		{ title: 'Bad', src: "assets/images/emoji-sad.png" });
	reflection_data: any;
	resourceDetail:any;
	modalIsShown:boolean=false;
	resourceId:any;
	refPaddCounter=0;
	constructor(
		public questionnaireService: QuestionnaireService,
		public toastr: ToastrService,
		public router: Router,
		private dataService: DataService) { }


	ngOnInit() {
		this.reflectionData();
	}

	// addPadding(){
	// 	setTimeout(function(){
	// 		let questRow = document.querySelectorAll('.quest-row');
	// 		for(let i=0,q=questRow,l=q.length;i<l;i++){
	// 			(q[i] as HTMLElement).style.paddingLeft=(i*20)+'px';
	// 		}
	// 	},100);
	// }
	

	reflectionData() {
		this.questionnaireService.get_resources().subscribe(
			Response => {
				console.log(Response);

				if (Response['status'] == 'success') {
					this.reflection_data = Response['data'];
					// this.addPadding();
				} else {
					this.toastr.error(Response['msg']);
				}
			}
		);
	}

	getRoute(route, route1, resourceId){
		let str4 = "/patient/dashboard".concat("/"),
		str3 = str4.concat(route),
		str2 = str3.concat("/"),
		str1 = str2.concat(route1);
		this.router.navigate([str1]).then(() =>{
			this.dataService.navigaeToResource(resourceId);
		});
	}

	openModal(resource,index) {
		
		this.modalIsShown = !this.modalIsShown;
		this.resourceDetail=resource;
	}

	modalClosed(){
		this.modalIsShown=false;
	}
	videoTimeUpdated(resource_id){
		this.resourceId = resource_id;
		this.reflectionData();
	}

	getFormatedDate(date:string){
		return new Date(date.replace(/-/g, "/"));
	}

}
