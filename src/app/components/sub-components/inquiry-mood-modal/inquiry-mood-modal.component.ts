import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { ToastrService } from "ngx-toastr";
import { VgAPI } from "videogular2/core";
import { QuestionnaireService } from "../../../service/questionnaire.service";
import { CONSTANTS } from "../../../config/constants";
import { Idle } from "@ng-idle/core";


@Component({
    selector: "app-inquiry-mood-modal",
    templateUrl: "./inquiry-mood-modal.component.html",
    styleUrls: ["./inquiry-mood-modal.component.css"]
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
    pageContentId: any;
    video_completed: any;
    ratingType: any;
    totalTime: any;
    selected: any;
    prePostRating: any;
    resourseType: any;
    dynamic: any = 0;
    max: any;
    moodOption = new Array<any>(
        "assets/images/emoji-happy.png",
        "assets/images/emoji-blushing.png",
        "assets/images/emoji-speechless.png",
        "assets/images/emoji-smirk.png",
        "assets/images/emoji-sad.png"
    );
    moodTitle = new Array<any>("Great", "", "Neutral", "", "Bad");
    timer: any;
    qhoid: any;
    backButtonFlag: any;
    nextButtonFlag: any;
    playerVars = {
        cc_lang_pref: "en"
    };
    questionnireForm: FormGroup;
    arm: string;
    lastQuesOpId=null;
    setTimeInterval=null;

    @Input("contentId") contentId: any = "";
    @Input("calleePage") calleePage: any = "";
    @Input("resourceDetail") resourceDetail: any;
    @Input("modalIsShown") modalIsShown: any;
    @ViewChild("preInfo") preInfo;
    @ViewChild("postMessage") postMessage;
    @ViewChild("videoModal") videoModal;
    @ViewChild("excerciseModal") excerciseModal;
    @Output() onCloseModal = new EventEmitter();
    @Output() onVideoUpdated = new EventEmitter();

    constructor(
        public questService: QuestionnaireService,
        public toastr: ToastrService,
        private idle: Idle,
        private formBuilder: FormBuilder,
        public modalService: BsModalService
    ) {
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
            video_completed: "",
            callee_page: ""
        });
    }

    ngOnInit() {
        this.arm = localStorage.getItem("arm");
        // this.idle.setIdle(30); // test for 15 seconds (X+30)
    }

    ngAfterViewInit() {
        setTimeout(() => {
            // && this.arm == 'INTERVENTION'
            if (this.modalIsShown && this.resourceDetail) {
                this.openModal(
                    this.resourceDetail.level == "mood" &&
                        this.arm == "INTERVENTION"
                        ? this.preInfo
                        : this.videoModal
                );
            }
        }, 1);

    }

    onPlayerReady(api: VgAPI) {
        this.api = api;
        this.api.getDefaultMedia().subscriptions.timeUpdate.subscribe(() => {
            this.totalTime = Math.floor(this.api.getDefaultMedia().duration);
            this.time = this.totalTime / 2;
            this.spentTime = Math.floor(this.api.getDefaultMedia().currentTime);
        
            this.time = this.spentTime > this.time ? 0 : this.time - this.spentTime;
            this.makeVideoCompleted();
        
            if(this.spentTime%10==0){
                this.updateResourceTime();
            }

            if(this.spentTime==0 && this.totalTime>=CONSTANTS.SESSION_TIMEOUT){
               console.log('sp',this.spentTime,'total',this.totalTime);
               this.idle.setIdle(this.totalTime+30); // test for 15 seconds (X+30)
            }
        });

        this.api.getDefaultMedia().subscriptions.pause.subscribe(() => {
            clearTimeout(this.timer);
        });

    }

    openModal(template: TemplateRef<any>) {
        this.level = this.resourceDetail.level;
        this.video_completed = this.resourceDetail.is_completed;
        this.resourseType = this.resourceDetail.type;
        this.pageContentId = this.contentId
            ? this.contentId
            : this.resourceDetail.chapter_content_id;

        if (this.resourseType == "VIDEO") {
            this.currentSrc = this.resourceDetail.link.split("v=")[1];
            if (!this.currentSrc) {
                this.currentSrc = this.resourceDetail.link.split("/")[3];
            }
        }

        else if (this.resourseType == "AUDIO")
            this.currentSrc = this.resourceDetail.link;
        this.resourceId =
            this.resourceDetail.resources_id || this.resourceDetail.id;

        this.addResourceVisited({
            contentId: this.pageContentId,
            callee_page: this.calleePage,
            resource_id: this.resourceId
        });
        this.videoRef = this.modalService.show(template, { class: "modal-lg" });
    }

    openQuestionModal(template: TemplateRef<any>, ratingType?: any) {
        this.videoRef.hide();
        this.ratingType = ratingType;

        this.updateResourceTime();

        if (this.arm == 'INTERVENTION') {
            if (this.level == "mood" || this.level == "inquiry") {
                this.questService
                    .getResourceQuestion({
                        exercise_type: this.level.toUpperCase(),
                        resource_id: this.resourceId
                    })
                    .subscribe(Response => {
                        if (Response["status"] == "success") {
                            console.log(this.resourceId);
                            this.onVideoUpdated.emit(this.resourceId);
                            this.questions = Response["data"];
                            this.setStepValue();
                            this.questionRef = this.modalService.show(template, {
                                class: "modal-lg"
                            });
                        } else {
                            this.toastr.error(Response["msg"] || "Server error");
                        }
                    });
            } else {
               let form = this.getFormValues();
                this.questService
                    .submitResourceQuestionResponse(form)
                    .subscribe(response => {
                        if (response["status"] == "success") {
                            this.lastQuesOpId =response["data"]["ques_opt_id"];
                            this.onVideoUpdated.emit(this.resourceId);
                            this.onCloseModal.emit("closed");
                        }
                    });
            }

        } else {
           let form = this.getFormValues();
            this.questService
                .submitResourceQuestionResponse(form)
                .subscribe(response => {
                    if (response["status"] == "success") {
                        this.onVideoUpdated.emit(this.resourceId);
                        this.onCloseModal.emit("closed");
                    }
                });
        }
    }

    getFormValues(isResUpdate=0){
        this.questionnireForm.value.exercise_type = this.level;
        this.questionnireForm.value.video_completed = this.video_completed;
        this.questionnireForm.value.resource_id = this.resourceId;
        this.questionnireForm.value.content_id =
            this.contentId || this.pageContentId;
        this.questionnireForm.value.total_time = this.totalTime;
        this.questionnireForm.value.callee_page = this.calleePage;
        this.questionnireForm.value.left_time = this.totalTime - this.spentTime;

        this.questionnireForm.value.is_res_update = isResUpdate;
        this.questionnireForm.value.last_ques_op_id = this.lastQuesOpId;

        return this.questionnireForm.value;
    }

    updateResourceTime(){
        let form = this.getFormValues(1);
        form['showSpinner'] = false;
        this.questService.submitResourceQuestionResponse(form)
            .subscribe(response => {
                if (response["status"] == "success") {
                    this.lastQuesOpId =response["data"]["ques_opt_id"];
                }
            });

            // console.log(CONSTANTS.SESSION_TIMEOUT);
            // CONSTANTS.SESSION_TIMEOUT=3600;
    }

    onStateChange(event) {
        this.ytEvent = event.data;
        this.spentTime = this.player.getCurrentTime();

        if (this.ytEvent == 1) {
            this.time =
                this.spentTime > this.time ? 0 : this.time - this.spentTime;
            this.makeVideoCompleted();
        } else if (this.ytEvent == 2) {
            clearTimeout(this.timer);
        }else if(this.ytEvent == 0){
            clearInterval(this.setTimeInterval);
        }

        if(this.spentTime==0 && this.totalTime>=CONSTANTS.SESSION_TIMEOUT){
           console.log('sp',this.spentTime,'total',this.totalTime);
       
           this.idle.setIdle(this.totalTime+30); // test for 15 seconds (X+30)
        }    
    
        this.updateResourceTime();
    }

    savePlayer(player) {
        this.totalTime = Math.floor(player.getDuration());
         // this.time = Math.floor(player.getDuration() / 2);
        // console.log(this.time);
        this.player = player;

        this.setTimeInterval = setInterval(()=>{
            this.spentTime = this.player.getCurrentTime();
            if(this.modalIsShown){
               this.updateResourceTime();
            } else { 
               clearInterval(this.setTimeInterval);
            }
            
        },10000);
    }

    playVideo() {
        this.player.playVideo();
    }
    
    makeVideoCompleted() {
        this.timer = setTimeout(() => {
            this.isCompleted = false;
        }, this.time * 1000);
    }

    setStepValue() {
        this.value;
        this.dynamic;
        this.max = this.questions.length;
        this.backButtonFlag = !1;
        this.nextButtonFlag = !0;
    }
    
    nextQuestion(videoModal?: TemplateRef<any>, value?: any) {
        console.log(this.totalTime);
        console.log(this.spentTime);

        this.getFormValues();
        this.questionnireForm.value.question_id = this.questions[this.value].id;
        this.questionnireForm.value.qhoid = this.qhoid;

        if (value == 0)
            this.questionnireForm.value.skip_exercise_pre_rating_count = 1;
        else if (value > 0 || value == "mood")
            this.questionnireForm.value.skip_question_post_rating_count = 1;
        if (this.ratingType)
            this.questionnireForm.value.pre_rating = this.selected;
        else if (!this.ratingType)
            this.questionnireForm.value.post_rating = this.selected;

        this.questService
            .submitResourceQuestionResponse(this.questionnireForm.value)
            .subscribe(response => {
                if (response["status"] == "success") {
                    this.lastQuesOpId =response["data"]["ques_opt_id"];
                    if (this.ratingType == "prerating") {
                        this.questionRef.hide();
                        this.videoRef = this.modalService.show(videoModal, {
                            class: "modal-lg"
                        });
                        this.ratingType = "";
                        this.selected = "";
                        this.value++;
                        this.dynamic++;
                        console.log("value " + this.value);
                        console.log("dynamic " + this.dynamic);
                    } else {
                        this.questionnireForm.reset();
                        this.totalTime = 0;
                        this.questionnireForm.value.left_time = 0;
                        if (value == 0) {
                            this.questionRef.hide();
                            this.onVideoUpdated.emit(this.resourceId);
                            this.onCloseModal.emit("closed");
                        }
                        if (this.dynamic < this.questions.length - 1) {
                            this.value++;
                            this.dynamic++;
                            console.log("value " + this.value);
                            console.log("dynamic " + this.dynamic);
                            this.onVideoUpdated.emit(this.resourceId);
                            this.onCloseModal.emit("closed");
                        } else {
                            this.questionRef.hide();
                            this.value = 0;
                            this.dynamic = 0;
                            if (this.level == "mood") {
                                this.questService
                                    .getResourceQuestion({
                                        exercise_type: this.level.toUpperCase(),
                                        resource_id: this.resourceId
                                    })
                                    .subscribe(response => {
                                        if (response["status"] == "success") {
                                            this.getPrePostRating(videoModal);
                                        }
                                    });
                            } else {
                                this.onVideoUpdated.emit(this.resourceId);
                                this.onCloseModal.emit("closed");
                            }
                        }
                        this.nextButtonFlag =
                            this.value < this.questions.length - 1;
                        this.backButtonFlag = this.value > 0;
                    }
                    this.questionnireForm.reset();

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
        this.postMessageRef = this.modalService.show(template, {
            class: "modal-lg"
        });
    }

    closeModal(template: BsModalRef) {
        template.hide();
        console.log("modal closed");
        this.onVideoUpdated.emit(this.resourceId);
        this.onCloseModal.emit("closed");
        clearInterval(this.setTimeInterval);
        this.updateResourceTime();
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
                    //     response["msg"] || "Favorite saved"
                    // );
                }
            });
    }

    getPrePostRating(videoModal?: TemplateRef<any>) {
        this.questService
            .getResourceQuestionResponses({
                exercise_type: this.level.toUpperCase(),
                resource_id: this.resourceId
            })
            .subscribe(response => {
                if (response["status"] == "success") {
                    this.prePostRating =
                        response["data"];
                    this.prePostDiff =
                        this.prePostRating[0]["post_rating"] - this.prePostRating[1]["pre_rating"];
                    this.openPostMessageModal(
                        videoModal
                    );
                }
            });

    }
}
