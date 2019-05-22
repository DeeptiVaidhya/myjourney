import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { VgAPI } from "videogular2/core";
import { QuestionnaireService } from '../../../service/questionnaire.service';

@Component({
	selector: 'app-inquiry-mood-modal',
	templateUrl: './inquiry-mood-modal.component.html',
	styleUrls: ['./inquiry-mood-modal.component.css']
})
export class InquiryMoodModalComponent implements OnInit, AfterViewInit {
	videoRef: BsModalRef;
	questionRef: BsModalRef;
	preInfoRef: BsModalRef;
	postMessageRef: BsModalRef;
	api: VgAPI;
	player: YT.Player;
	ytEvent: any;
	currentSrc: any;

	time: number;
	level: any;
	isCompleted: boolean = true;
	completed: any;
	questions: any;
	value: any = 0;
	prePostDiff: any;
	resourceId: any;
	startTimer: any;
	spentTime: any;
	video_completed: any;
	ratingType: any;
	totalTime: any;
	selected: any;
	prePostRating: any;
	dynamic: any = 0;
	max: any;
	moodOption = new Array<any>(
		"assets/images/emoji-happy.png",
		"assets/images/emoji-blushing.png",
		"assets/images/emoji-speechless.png",
		"assets/images/emoji-smirk.png",
		"assets/images/emoji-sad.png");
	timer: any;
	qhoid: any;
	backButtonFlag: any;
	nextButtonFlag: any;
	playerVars = {
		cc_lang_pref: "en"
	};
	questionnireForm: FormGroup;

	@Input('contentId') contentId:any='';
	@Input('resourceDetail') resourceDetail:any;
	@Input('modalIsShown') modalIsShown:any;
	@ViewChild('preInfo') preInfo; 
	@ViewChild('postMessage') postMessage; 
	@ViewChild('videoModal') videoModal; 
	@ViewChild('excerciseModal') excerciseModal; 
	@Output() onCloseModal = new EventEmitter();
	@Output() onVideoUpdated = new EventEmitter();

	constructor(
		
		//public route: ActivatedRoute,
		public questService: QuestionnaireService,
		public toastr: ToastrService,
		//private router: Router,
		//private dataService: DataService,
		
		private formBuilder: FormBuilder, public modalService: BsModalService) {

		this.questionnireForm = this.formBuilder.group({
			response: [""],
			question_id: "",
			exercise_type: "",
			resource_id: "",
			content_id: "",
			left_time: "",
			total_time: "",
			pre_rating: "",
			post_rating: "",
			skip_exercise_pre_rating_count: "",
			skip_question_post_rating_count: "",
			qhoid: "",
			video_completed: ""
		});
	}

	ngOnInit() {
		//detail ?.resource_data ?.level == 'mood' ? preInfo : videoModal, detail ?.resource_data
		// if(this.resourceDetail && this.resourceDetail.level){
			
		// }
		
	}

	ngAfterViewInit(){
		setTimeout(() => {

			if(this.modalIsShown && this.resourceDetail){
				this.openModal(this.resourceDetail.level=='mood' ? this.preInfo : this.videoModal);
			}
		},1);
	}

	openModal(
		template: TemplateRef<any>,
	) {
		this.level = this.resourceDetail.level;
		this.video_completed = this.resourceDetail.is_completed;
		this.currentSrc = this.resourceDetail.link.split("v=")[1];
		this.resourceId = this.resourceDetail.id;

		this.videoRef = this.modalService.show(template, { class: "modal-lg" });
	}

	openQuestionModal(template: TemplateRef<any>, ratingType?: any) {
		this.videoRef.hide();
		this.ratingType = ratingType;
		if(this.level == 'mood' || this.level == 'inquiry')
		{	
			this.questService
			.getResourceQuestion({
				exercise_type: this.level.toUpperCase(),
				resource_id: this.resourceId
			})
			.subscribe(Response => {
				if (Response["status"] == "success") {
					this.questions = Response["data"];
					this.setStepValue();
					this.questionRef = this.modalService.show(template, {
						class: "modal-lg"
					});
				} else {
					this.toastr.error(Response["msg"] || "Server error");
				}
			});
		}
	}

	onStateChange(event) {
		this.ytEvent = event.data;
		this.spentTime = this.player.getCurrentTime();
		if (this.ytEvent == 1) {
			this.time =
				this.spentTime > this.time ? 0 : this.time - this.spentTime;
			this.makeVideoCompleted();
		}
		if (this.ytEvent == 2) {
			clearTimeout(this.timer);
		}
	}

	savePlayer(player) {
		this.totalTime = player.getDuration();
		this.time = Math.floor(player.getDuration() / 2);
		this.player = player;
	}

	playVideo() {
		this.player.playVideo();
	}

	makeVideoCompleted() {
		this.timer = setTimeout(() => {
			this.isCompleted = false;
		}, this.time*1000);
	}

	setStepValue() {
		this.value;
		this.dynamic;
		this.max = this.questions.length;
		this.backButtonFlag = !1;
		this.nextButtonFlag = !0;
	}
	nextQuestion(videoModal?: TemplateRef<any>, value?: any) {
		let option_ids;
		if (this.level == 'inquiry')
			option_ids = document.querySelector("textarea").getAttribute('data-qhoid');
		else if (this.level == 'mood')
		{
		console.log(this.questions[this.value].user_response);
			let qhoid=null;
			if(document.querySelector("img[name='mood'].emoji-select")){
				qhoid = document.querySelector("img[name='mood'].emoji-select").getAttribute('data-qhoid');
			} else if(document.querySelector("img[name='mood']")){
				qhoid = document.querySelector("img[name='mood']").getAttribute('data-qhoid');
			}
			option_ids = this.questions[this.value].user_response ? qhoid : null;
		}
		this.qhoid = option_ids;
		this.questionnireForm.value.question_id = this.questions[this.value].id;
		this.questionnireForm.value.exercise_type = this.level;
		this.questionnireForm.value.qhoid = this.qhoid;
		this.questionnireForm.value.video_completed = this.video_completed;
		this.questionnireForm.value.resource_id = this.resourceId;
		this.questionnireForm.value.content_id = this.contentId;
		this.questionnireForm.value.total_time = this.totalTime;
		this.questionnireForm.value.left_time = this.totalTime - this.spentTime;
		console.log(this.qhoid);
		if (value == 0)
			this.questionnireForm.value.skip_exercise_pre_rating_count = 1;
		else if (value > 0 || value == 'mood')
			this.questionnireForm.value.skip_question_post_rating_count = 1;
		if (this.ratingType)
			this.questionnireForm.value.pre_rating = this.selected;
		else if (!this.ratingType)
			this.questionnireForm.value.post_rating = this.selected;

		console.log(this.questionnireForm.value);
		this.questService
			.submitResourceQuestionResponse(this.questionnireForm.value)
			.subscribe(response => {
				if (response["status"] == "success") {
					if (this.ratingType == "prerating") {
						this.questionRef.hide();
						this.videoRef = this.modalService.show(videoModal, {
							class: "modal-lg"
						});
						this.ratingType = "";
						this.selected = "";
						this.value++;
						this.dynamic++;
					} else {
						this.questionnireForm.reset();
						if (value == 0) {
							this.questionRef.hide();
						}
						if (this.dynamic < this.questions.length - 1) {
							this.value++;
							this.dynamic++;
						} else {
							this.questionRef.hide();
							this.value = 0;
							this.dynamic = 0;
							if (this.level == 'mood') {
								this.questService
									.getResourceQuestion({
										exercise_type: this.level.toUpperCase(),
										resource_id: this.resourceId
									})
									.subscribe(response => {
										if (response["status"] == "success") {
											this.prePostRating = response["data"];
											this.prePostDiff = this.prePostRating[1].user_response['post_rating'] - this.prePostRating[0].user_response['pre_rating'];
											this.openPostMessageModal(videoModal);
										}
									});
							}
						}
						this.nextButtonFlag =
							this.value < this.questions.length - 1;
						this.backButtonFlag = this.value > 0;
					}
				}
			});
		this.selected = "";
	}
	previousQuestion(): void {
		if (this.value >= 1) {
			this.value--;
			this.dynamic--;
		}
		this.backButtonFlag = this.value > 0;
		this.nextButtonFlag = this.value < this.questions.length;
		this.value = this.value < 0 ? 0 : this.value;
	}

	rateMood(value: any, videoModal: any) {
		this.selected = value;
		this.nextQuestion(videoModal);
	}

	openPostMessageModal(template: TemplateRef<any>) {
		this.postMessageRef = this.modalService.show(template, { class: "modal-lg" });
	}

	closeModal(template:BsModalRef){
		template.hide();
		console.log('modal closed');
		!this.isCompleted && this.onVideoUpdated.emit(true);

		this.onCloseModal.emit('closed');
	}
}
