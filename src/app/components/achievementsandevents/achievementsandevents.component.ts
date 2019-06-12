import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { QuestionnaireService } from "../../service/questionnaire.service";
@Component({
	selector: "app-achievementsandevents",
	templateUrl: "./achievementsandevents.component.html",
	styleUrls: ["./achievementsandevents.component.css"]
})
export class AchievementsandeventsComponent implements OnInit {
	userDetail: any;
	currentWeek: any;
	totalTimeSpentOnSite: any;
	totalWatchedAudioVideo: any;
	weekInfo: any;
	constructor(
		private questService: QuestionnaireService,
		private route: Router,
		private toastr: ToastrService
	) {}

	ngOnInit() {
		this.questService.patients_weekly_questionnaire().subscribe(
			result => {
				const response = result;
				this.userDetail =
					response["data"] &&
					response["data"].hasOwnProperty("user_detail") &&
					response["data"].user_detail;
				this.currentWeek = response["data"].week_number;
				this.weekInfo = response["data"].week_info;
				// this.totalTimeSpentOnSite = response['data'].total_time_spent_in_week;
				// this.totalWatchedAudioVideo = response['data'].total_watched_audio_video;

				console.log(this.weekInfo);
			},
			err => {
				console.log(err);
			}
		);
	}

	getWeekEvent(text: string) {
		return text ? text.replace(/\r\n|\n/g, "<br/>") : '';
	}
}
