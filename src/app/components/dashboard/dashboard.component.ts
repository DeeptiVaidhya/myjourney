import { AmChartsService } from "@amcharts/amcharts3-angular";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import "../../../assets/js/pie.js";
import { AuthService } from "../../service/auth.service";
import { QuestionnaireService } from "../../service/questionnaire.service";
@Component({
	selector: "app-dashboard",
	templateUrl: "./dashboard.component.html",
	styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
	chart: any;
	data: any;
	username: any;
	arm: string = "";
	user_detail: any = [];
	pageContent: any;
	currentWeek: any;
	interval: any;
	weekly_quotes: any;
	currentWeekInfo: any;
	is_questionnaire_completed = false; // check questionnire completed or not
	incompleted_questionnaire: number; // default all questionnaires are not completed.
	all_week_status = "";
	routeData: any;
	is_enable_questionnire: any;
	routlink: any = "understanding-breast-cancer";
	bluejeansDetails: any;
	constructor(
		private AmCharts: AmChartsService,
		private questService: QuestionnaireService,
		public toastr: ToastrService,
		public router: Router,
		private authService: AuthService
	) {}

	ngOnInit() {
		localStorage.getItem("username") &&
			(this.username = localStorage.getItem("username"));
		this.patient_weekly_questionnaire();
		this.blueJeansSession();
	}

	blueJeansSession() {
		this.questService.blueJeansSession().subscribe(
			result => {
				if (result["status"] == "success") {
					this.bluejeansDetails = result["data"];
				}
			},
			err => {
				console.log(err);
			}
		);
	}
	
	patient_weekly_questionnaire() {
		this.questService.patients_weekly_questionnaire().subscribe(
			result => {
				console.log(result);
				const response = result;
				if (response.hasOwnProperty("chapters")) {
					this.pageContent = response["chapters"];
				}
				this.arm = response.hasOwnProperty("arm")
					? response["arm"]
					: "";
				if (response.hasOwnProperty("data")) {
					this.user_detail =
						response["data"].hasOwnProperty("user_detail") &&
						response["data"].user_detail;
					this.currentWeekInfo =
						response["data"].hasOwnProperty("week_info") &&
						response["data"].week_info;
					this.currentWeek = response["data"].week_number;
					this.is_enable_questionnire =
						response["data"].enable_questionnire;
					this.is_questionnaire_completed =
						response["data"].is_questionnaire_completed;
					this.incompleted_questionnaire =
						response["data"].incompleted_questionnaire;
				}
				if (Object.keys(response["quotes"]).length)
					this.weekly_quotes = response["quotes"];
			},
			err => {
				console.log(err);
			}
		);
	}

	viewAllAchivement() {
		if (this.currentWeek > 0) {
			this.router.navigate(["/achievements"]);
		} else {
			this.toastr.error("Week not started yet");
		}
	}

	getFormatedDate(date: string) {
		return new Date(date.replace(/-/g, "/"));
	}
}
