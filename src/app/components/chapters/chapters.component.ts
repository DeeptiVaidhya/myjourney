import { Component, OnDestroy, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import 'rxjs/add/observable/interval';
import { VgAPI } from 'videogular2/core';
import { DataService } from '../../service/data.service';
import { QuestionnaireService } from '../../service/questionnaire.service';
@Component({
	selector: 'app-chapters',
	templateUrl: './chapters.component.html',
	styleUrls: ['./chapters.component.css'],
})
export class ChaptersComponent implements OnDestroy {
	questionnireForm: FormGroup;
	videoRef: BsModalRef;
	questionRef: BsModalRef;
	slug: string = '';
	topic: string = '';
	api: VgAPI;
	player: YT.Player;
	ytEvent: any;
	currentSrc: any;
	is_sub_topic: boolean = false;
	is_added_favorite: boolean = false;
	pageContent: any;
	time: number;
	level: any;
	isCompleted: boolean = true;
	completed: any;
	questions: any;
	value: any;
	dynamic: any;
	max: any;
	backButtonFlag: any;
	nextButtonFlag: any;
	breadcrumb = [
		{ link: '/patient/dashboard', title: 'Home' },
	];
	chapterLink: any;
	playerVars = {
		cc_lang_pref: 'en'
	};
	constructor(
		public route: ActivatedRoute,
		public questService: QuestionnaireService,
		public toastr: ToastrService, private router: Router,
		private dataService: DataService,
		private formBuilder: FormBuilder,
		public modalService: BsModalService) {
		this.route.params.subscribe(param => {
			this.slug = param.sub_topic ? param.sub_topic : (param.chapter ? param.chapter : '');
			this.topic = param.topic && !param.sub_topic ? param.topic : '';
			this.is_sub_topic = !!param.sub_topic;
			// this.slug = param.chapter ? param.chapter : '';
			this.questService.chapterDetails({ type: 'slug', value: this.slug, is_sub_topic: !!param.sub_topic, 'arm': localStorage.getItem('arm') }).subscribe((response) => {
				if (response['status'] == "success") {
					this.pageContent = response['data'];
					this.is_added_favorite = response['is_added_favorite'];
					console.log(response);
					let obj: any;
					let bread = this.pageContent['breadcrumb'];
					if (bread && bread.length) {
						if (bread[0]['type'] == 'CONTENT') {
							obj = { link: '/patient/dashboard/' + bread[0]['slug'], title: bread[0]['content_name'] };
							this.breadcrumb.push(obj);
							this.chapterLink = obj.link;
						} else if (bread[1]['type'] == 'CONTENT') {
							obj = { link: '/patient/dashboard/' + bread[1]['slug'], title: bread[1]['content_name'] };
							this.breadcrumb.push(obj);
							this.chapterLink = obj.link;
						}
						if (bread[0]['type'] == 'TOPIC') {
							obj = { params: { scrollTo: bread[0]['slug'] }, title: bread[0]['content_name'] };
							this.breadcrumb.push(obj);
						} else if (bread[1]['type'] == 'TOPIC') {
							obj = { params: { scrollTo: bread[1]['slug'] }, title: bread[1]['content_name'] };
							this.breadcrumb.push(obj);
						}
					}
					obj = { link: '', title: this.pageContent.content_name, 'class': 'active' };
					this.breadcrumb.push(obj);

					if (!this.is_sub_topic) {
						this.navigateToElem();
					}
				}
			});
		});
		this.questionnireForm = this.formBuilder.group({
			response: [""],
			question_id: ""
		});
	}


	navigateToElem() {
		this.dataService.currentMessage.subscribe(param => {
			// console.log(param);
			let obj: any = param;
			if (obj && obj['scrollTo']) {
				console.log(document.querySelector('#topic--' + obj.scrollTo))
				setTimeout(() => {
					let el = document.querySelector('#topic--' + obj.scrollTo);
					if (el) {
						el.scrollIntoView(true);
						// now account for fixed header
						let scrolledY = window.scrollY;
						if (scrolledY) {
							window.scrollTo({
								top: scrolledY - document.querySelectorAll('nav')[0].clientHeight,
								left: 0,
								behavior: 'smooth',
							});
						}
					}
				}, 10);

			}
		});
	}
	ngOnDestroy() {
		this.dataService.changeMessage(null);
	}

	goToElem(obj) {
		console.log(obj);
		console.log(this.chapterLink);
		this.router.navigate([this.chapterLink]).then(() => {
			this.dataService.changeMessage(obj);
		});	//'/patient/dashboard/understanding-breast-cancer'
	}

	openModal(template: TemplateRef<any>, link: any, level: any) {
		this.level = level;
		this.currentSrc = link.split('v=')[1];
		this.videoRef = this.modalService.show(template, { class: "modal-lg" });

	}
	openQuestionModal(template: TemplateRef<any>) {
		this.videoRef.hide();

		this.questService.getResourceQuestion({ exercise_type: this.level.toUpperCase() }).subscribe(Response => {
			if (Response['status'] == 'success') {
				this.questions = Response['data'];
				this.setStepValue();
				this.questionRef = this.modalService.show(template, { class: "modal-lg" });
			} else {
				this.toastr.error(Response['msg'] || "Server error");
			}
		});
	}

	onStateChange(event) {
		this.ytEvent = event.data;
	}

	savePlayer(player) {
		this.time = Math.floor(player.getDuration() / 2);
		this.player = player;
		this.makeVideoCompleted();
	}

	playVideo() {
		this.player.playVideo();
	}

	makeVideoCompleted() {
		setTimeout(() => {
			this.isCompleted = false;
		}, 1000);
	}
	// this.time*
	favorite(contentId) {
		if (contentId && this.is_sub_topic) {
			this.questService.updateFavorite({ content_id: contentId, is_added: this.is_added_favorite }).subscribe((response) => {
				if (response['status'] == "success") {
					this.is_added_favorite = !this.is_added_favorite;
					this.toastr.success(response['msg'] || 'Favorite saved');

				}
			})
		} else {
			this.toastr.error('Invalid content or not a sub topic.');
		}
	}

	setStepValue() {
		this.value = 1;
		this.dynamic = 1;
		this.max = this.questions.length;
		this.backButtonFlag = !1;
		this.nextButtonFlag = !0;
	}
	nextQuestion() {
		this.questionnireForm.value.question_id = this.questions[this.value - 1].id;
		this.questService.submitResourceQuestionResponse(this.questionnireForm.value).subscribe((response) => {
			if (response['status'] == "success") {
				this.questionnireForm.reset();
				if (this.dynamic < this.questions.length) {
					this.value++;
					this.dynamic++;
				}
				this.nextButtonFlag = this.value <= this.questions.length - 1;
				this.backButtonFlag = this.value > 1;

			}
		});
	}
	previousQuestion(): void {
		if (this.value >= 2) {
			this.value--;
			this.dynamic--;
		}
		this.backButtonFlag = this.value > 1;
		this.nextButtonFlag = this.value < this.questions.length;
		this.value = this.value < 1 ? 1 : this.value;

	}
}
