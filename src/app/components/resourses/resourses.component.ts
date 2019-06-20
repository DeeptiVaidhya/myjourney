import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { QuestionnaireService } from '../../service/questionnaire.service';

@Component({
	selector: 'app-resourses',
	templateUrl: './resourses.component.html',
	styleUrls: ['./resourses.component.css'],
})
export class ResoursesComponent implements OnInit {
	resourceDetail:any;
	resources_data: any;
	player:any=[];
	activeIndex:any;
	resourceId:any;
	modalIsShown:boolean=false;
	constructor( public questionnaireService: QuestionnaireService,public toastr: ToastrService) {}
	breadcrumb = [{ link: '/', title: 'Home' }, { title: 'Resources',class:'active' }];
	ngOnInit() {
		this.getResources();
	}

	getResources(){
		this.questionnaireService.get_resources().subscribe(
			Response => {
				if (Response['status'] == 'success') {
					this.resources_data = Response['data'];
					console.log(this.resources_data);
				}else{
					this.toastr.error(Response['msg']);
				}
			}
		);
	}
	goToSite(resource:any){
		window.open(resource.link, "_blank");
	}

	openModal(resource,index) {
		console.log(resource);
		this.activeIndex=index;
		this.modalIsShown = !this.modalIsShown;
		this.resourceDetail=resource;
		console.log(this.resourceDetail);
	}

	modalClosed(){
		this.modalIsShown=false;
		console.log("model close function "+this.modalIsShown);
	}
	videoTimeUpdated(resource_id){
		console.log(resource_id);
		this.resourceId = resource_id;
		console.log("video time update "+this.modalIsShown);
	}

}
