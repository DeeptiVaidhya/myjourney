import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuestionnaireService } from '../../service/questionnaire.service';

@Component({
	selector: 'app-chapters',
	templateUrl: './chapters.component.html',
	styleUrls: ['./chapters.component.css'],
})
export class ChaptersComponent implements OnInit {
	slug: string = '';
	topic: string = '';
	is_sub_topic: boolean = false;
	is_added_favorite: boolean = false;
	pageContent:any;
	breadcrumb = [
		{ link: '/patient/dashboard', title: 'Home' },
	];
	constructor(public route: ActivatedRoute,public questService:QuestionnaireService, public toastr:ToastrService) {
		this.route.params.subscribe(param => {
			this.slug = param.sub_topic ? param.sub_topic :(param.chapter ? param.chapter : '');
			this.topic=param.topic && !param.sub_topic ? param.topic : '';
			this.is_sub_topic=!!param.sub_topic;
			// this.slug = param.chapter ? param.chapter : '';
			this.questService.chapterDetails({type:'slug',value:this.slug, is_sub_topic: !!param.sub_topic}).subscribe((response)=>{
				if(response['status'] == "success")
				{
					this.pageContent = response['data'];
					this.is_added_favorite = response['is_added_favorite'];
					console.log(response);
				}
			});
		});
	}

	ngOnInit() {
		
	}

	favorite(contentId){
		if(contentId && this.is_sub_topic){
			this.questService.updateFavorite({content_id:contentId,is_added:this.is_added_favorite}).subscribe((response)=>{
				if(response['status'] == "success"){
					this.is_added_favorite=!this.is_added_favorite;
					this.toastr.success(response['msg']||'Favorite saved');

				}
			})
		} else {
			this.toastr.error('Invalid content or not a sub topic.');
		}
	}
	
}
