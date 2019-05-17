import { Component, OnInit } from '@angular/core';
import { QuestionnaireService } from '../../service/questionnaire.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-my-reflections',
  templateUrl: './my-reflections.component.html',
  styleUrls: ['./my-reflections.component.css']
})
export class MyReflectionsComponent implements OnInit {

  reflection_data: any;
  constructor( public questionnaireService: QuestionnaireService,public toastr: ToastrService) {}

  ngOnInit() {
    this.reflectionData();
  }

  reflectionData(){
    this.questionnaireService.get_reflectionData().subscribe(
			Response => {	
        console.log(Response);
        
				if (Response['status'] == 'success') {
					this.reflection_data = Response['data'];
				}else{
					this.toastr.error(Response['msg']);
				}
			}
		);
  }

}
