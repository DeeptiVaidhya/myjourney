import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { QuestionnaireService } from '../../service/questionnaire.service';
@Component({
	selector: 'app-myfavorites',
	templateUrl: './myfavorites.component.html',
	styleUrls: ['./myfavorites.component.css'],
})
export class MyfavoritesComponent implements OnInit {
	chapters: any = [];
	constructor(private questService: QuestionnaireService, private toastr: ToastrService) {}

	ngOnInit() {
		this.getFavoriteTopic();
	}

	getFavoriteTopic() {
		this.questService.getFavoriteSubTopic().subscribe(Response => {
			if (Response['status'] == 'success') {
				this.chapters = Response['chapters'];
			} else {
				this.toastr.error['Content not available'];
			}
		});
	}
}
