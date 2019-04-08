import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { HelperService } from './helper.service';

@Injectable()
export class QuestionnaireService {
	constructor(public helperService:HelperService) { }

	/**
	 * 
	 * @param data 
	 * Get Chapter/Sub-topic details
	 */
	chapterDetails(data): Observable<any> {
		return this.helperService.makeHttpRequest('educational/chapter-details', 'post', data,true);
	}

	/**
	 * 
	 * @param data 
	 * Toggle favorite for a sub topic and a user
	 */
	updateFavorite(data): Observable<any> {
		return this.helperService.makeHttpRequest('educational/update-favorite', 'post', data,true);
	}

	/**
	 * @desc Function is used to show total questionnaire completed within current week.
	 */
	patients_weekly_questionnaire() {
		return this.helperService.makeHttpRequest('questionnaire/dash-weekly-questionnaire', 'get', {},true);
	}

	/**
	 * @param type 
	 * @desc Function is used to get questionnaire accroding to type like FACT_G7,PRO-CTCAE etc.
	 */

	get_questionnaire(data) {
		return this.helperService.makeHttpRequest('questionnaire/get-questionnaire', 'post', data,true);
	}

	/**
	 * @param data 
	 * @desc Function is used to save questionnaire answer given by user.
	 */
	save_questionnaire(data) {
		return this.helperService.makeHttpRequest('questionnaire/questionnaire/answer', 'post', data,true);
	}

	/**
	 * @desc Function is used to get current running week information.
	 */
	get_current_week() {
		return this.helperService.makeHttpRequest('questionnaire/questionnaire/week-info', 'get', {},true);
	}

	/**
	 * @desc Function is used to get favorite subtopic selected by user.
	 */
	getFavoriteSubTopic()
	{
		return this.helperService.makeHttpRequest('educational/my-favorite', 'get', {},true);
	}

}
