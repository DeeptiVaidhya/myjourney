import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import "rxjs/add/observable/interval";
import { AuthService } from "../../service/auth.service";
import { DataService } from "../../service/data.service";
import { QuestionnaireService } from "../../service/questionnaire.service";

@Component({
	selector: "app-chapters",
	templateUrl: "./chapters.component.html",
	styleUrls: ["./chapters.component.css"]
})
export class ChaptersComponent implements OnDestroy, OnInit {
	public isLoggedIn: Boolean = true;
	timedOut = false;
	isHeaderHidden = false;
	slug: string = "";
	topic: string = "";
	is_sub_topic: boolean = false;
	is_added_favorite: boolean = false;
	pageContent: any;
	next_previous_subtopic: any;
	resourceId: any;
	player: any = [];
	interval: any;
	activeIndex: any;
	breadcrumb = [{ link: "/patient/dashboard", title: "Home" }];
	chapterLink: any;
	modalIsShown: boolean = false;
	arm: string;
	resourceDetail: any;
	constructor(
		public route: ActivatedRoute,
		public questService: QuestionnaireService,
		public toastr: ToastrService,
		private router: Router,
		private authService: AuthService,
		private dataService: DataService
	) {
		this.route.params.subscribe(param => {
			this.breadcrumb = [{ link: "/patient/dashboard", title: "Home" }];
			this.slug = param.sub_topic
				? param.sub_topic
				: param.chapter
					? param.chapter
					: "";
			this.topic = param.topic && !param.sub_topic ? param.topic : "";
			this.is_sub_topic = !!param.sub_topic;
			this.questService
				.chapterDetails({
					type: "slug",
					value: this.slug,
					is_sub_topic: !!param.sub_topic,
					arm: localStorage.getItem("arm")
				})
				.subscribe(response => {
					if (response["status"] == "success") {
						this.pageContent = response["data"];
						this.next_previous_subtopic = this.pageContent[
							"next_prev_sub_topic"
						];
						console.log(this.next_previous_subtopic);
						this.is_added_favorite = response["is_added_favorite"];
						if (this.pageContent.id) {
							this.visitedChapter({
								contentId: this.pageContent.id,
								callee_page: this.pageContent.slug
							});
						}
						let obj: any;
						let bread = this.pageContent["breadcrumb"];
						if (bread && bread.length) {
							if (bread[0]["type"] == "CONTENT") {
								obj = {
									link:
										"/patient/dashboard/" +
										bread[0]["slug"],
									title: bread[0]["content_name"]
								};
								this.breadcrumb.push(obj);
								this.chapterLink = obj.link;
							} else if (bread[1]["type"] == "CONTENT") {
								obj = {
									link:
										"/patient/dashboard/" +
										bread[1]["slug"],
									title: bread[1]["content_name"]
								};
								this.breadcrumb.push(obj);
								this.chapterLink = obj.link;
							}
							if (bread[0]["type"] == "TOPIC") {
								obj = {
									params: { scrollTo: bread[0]["slug"] },
									title: bread[0]["content_name"]
								};
								this.breadcrumb.push(obj);
							} else if (bread[1]["type"] == "TOPIC") {
								obj = {
									params: { scrollTo: bread[1]["slug"] },
									title: bread[1]["content_name"]
								};
								this.breadcrumb.push(obj);
							}
						}
						obj = {
							link: "",
							title: this.pageContent.content_name,
							class: "active"
						};
						this.breadcrumb.push(obj);

						if (!this.is_sub_topic) {
							this.navigateToElem();
						}

						this.goToRes();
					}
				});
		});
	}

	navigateToElem() {
		this.dataService.currentMessage.subscribe(param => {
			let obj: any = param;
			if (obj && obj["scrollTo"]) {
				console.log(document.querySelector("#topic--" + obj.scrollTo));
				setTimeout(() => {
					let el = document.querySelector("#topic--" + obj.scrollTo);
					if (el) {
						el.scrollIntoView(true);
						let scrolledY = window.scrollY;
						if (scrolledY) {
							window.scrollTo({
								top:
									scrolledY -
									document.querySelectorAll("nav")[0]
										.clientHeight,
								left: 0,
								behavior: "smooth"
							});
						}
					}
				}, 10);
			}
		});
	}

	goToRes() {
		this.dataService.currentResource.subscribe(param => {
			let obj: any = param;
			console.log(obj);
			if (obj && obj != "") {
				console.log(document.querySelector("#resource--" + obj));
				setTimeout(() => {
					let el = document.querySelector("#resource--" + obj);
					if (el) {
						el.scrollIntoView(true);
						let scrolledY = window.scrollY;
						if (scrolledY) {
							window.scrollTo({
								top:
									scrolledY -
									document.querySelectorAll("nav")[0]
										.clientHeight,
								left: 0,
								behavior: "smooth"
							});
						}
					}
				}, 10);
			}
		});
	}

	ngOnInit() {
		this.interval = setInterval(() => {
			this.questService
				.updateVisitedChapter({
					content_id: this.pageContent.id,
					showSpinner: false
				})
				.subscribe(response => {
					if (response["status"] == "success") {
					}
				});
		}, 10000);
	}

	ngOnDestroy() {
		this.dataService.changeMessage(null);
		this.questService
			.updateVisitedChapter({
				content_id: this.pageContent.id
			})
			.subscribe(response => {
				if (response["status"] == "success") {
					clearInterval(this.interval);
				}
			});
		clearInterval(this.interval);
	}

	goToElem(obj) {
		this.router.navigate([this.chapterLink]).then(() => {
			this.dataService.changeMessage(obj);
		}); //'/patient/dashboard/understanding-breast-cancer'
	}
	// this.time*
	favorite(contentId) {
		if (contentId && this.is_sub_topic) {
			this.questService
				.updateFavorite({
					content_id: contentId,
					is_added: this.is_added_favorite
				})
				.subscribe(response => {
					if (response["status"] == "success") {
						this.is_added_favorite = !this.is_added_favorite;
						this.toastr.success(
							response["msg"] || "Favorite saved"
						);
					}
				});
		} else {
			this.toastr.error("Invalid content or not a sub topic.");
		}
	}
	openModal(resource) {
		this.modalIsShown = !this.modalIsShown;
		this.resourceDetail = resource;
	}

	modalClosed() {
		this.modalIsShown = false;
	}

	videoTimeUpdated(resource_id) {
		this.resourceId = resource_id;
	}

	visitedChapter(content) {
		this.questService
			.addVisitedChapter({
				content_id: content.contentId,
				callee_page: content.callee_page
			})
			.subscribe(response => {
				if (response["status"] == "success") {
					// this.is_added_favorite = !this.is_added_favorite;
					// this.toastr.success(
					// 	response["msg"] || "Favorite saved"
					// );
				}
			});
	}
	goToSite(resource: any) {
		this.addResourceVisited({
			contentId: this.pageContent.id,
			callee_page: this.slug,
			resource_id: resource.id
		});
		window.open(resource.link, "_blank");
	}

	addResourceVisited(content) {
		this.questService
			.addResourceVisited({
				content_id: content.contentId,
				callee_page: content.callee_page,
				resource_id: content.resource_id
			})
			.subscribe(response => {
				if (response["status"] == "success") {
					// this.is_added_favorite = !this.is_added_favorite;
					// this.toastr.success(
					// 	response["msg"] || "Favorite saved"
					// );
				}
			});
	}
}
