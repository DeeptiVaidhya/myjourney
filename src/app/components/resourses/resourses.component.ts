import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { QuestionnaireService } from '../../service/questionnaire.service';

@Component({
	selector: 'app-resourses',
	templateUrl: './resourses.component.html',
	styleUrls: ['./resourses.component.css'],
})
export class ResoursesComponent implements OnInit {

	resources_data: any;
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
				}else{
					this.toastr.error(Response['msg']);
				}
			}
		);
	}
}
