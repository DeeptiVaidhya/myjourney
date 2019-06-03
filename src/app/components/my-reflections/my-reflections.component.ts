import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
	constructor(public questionnaireService: QuestionnaireService, public toastr: ToastrService) { }

	ngOnInit() {
		this.reflectionData();
	}

	reflectionData() {
		this.questionnaireService.get_resources().subscribe(
			Response => {
				console.log(Response);

				if (Response['status'] == 'success') {
					this.reflection_data = Response['data'];
				} else {
					this.toastr.error(Response['msg']);
				}
			}
		);
	}

	getRoute(route, route1){
		let str4 = "/patient/dashboard".concat("/"),
		str3 = str4.concat(route),
		str2 = str3.concat("/"),
		str1 = str2.concat(route1);
		return str1;
	}

}
