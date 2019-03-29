import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { CONSTANTS } from '../config/constants';
import { HelperService } from './helper.service';

@Injectable()
export class QuestionnaireService {
	constructor(private http: Http, private spinnerService: Ng4LoadingSpinnerService,public helperService:HelperService) { }

	/**
	 * @desc Used to add headers for each API call, if a user is logged in then add token header also
	 * @param isLoggedIn 
	 */
	getHeaders(isLoggedIn = false) {
		const headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded',
		});
		headers.append('Authorization', 'Basic ' + CONSTANTS.AUTH);
		isLoggedIn && headers.append('Token', localStorage.getItem('token'));
		return headers;
	}

	chapterDetails(data): Observable<any> {
		return this.helperService.makeHttpRequest('educational/chapter-details', 'post', data,true);
	}

	updateFavorite(data): Observable<any> {
		return this.helperService.makeHttpRequest('educational/update-favorite', 'post', data,true);
	}


	/**
	 * @desc Common Success Callback function used from all API calls
	 * @param res 
	 * @param resolve 
	 * @param reject 
	 * @param status 
	 */
	successCallback(res, resolve, reject, status = '') {
		this.spinnerService.hide();
		if (res.headers.get('Content-type').indexOf('application/json') !== -1) {
			resolve(res.json());
		} else {
			reject({ status: 'error', msg: 'Invalid response' });
		}
	}

	/**
	 * @desc Common Error Callback function used from all API calls
	 * @param err 
	 * @param resolve 
	 * @param reject 
	 * @param status 
	 */
	errorCallback(err, resolve, reject, status = '') {
		this.spinnerService.hide();
		if (err.headers.get('Content-type') === 'application/json') {
			reject(err.json().join());
		} else {
			console.log(err);
			reject({ status: 'error', msg: 'Invalid response' });
		}
	}

	/**
	 * @desc Function is used to show total questionnaire completed within current week.
	 */
	patients_weekly_questionnaire() {
		this.spinnerService.show();
		return new Promise((resolve, reject) => {
			this.http
				.get(CONSTANTS.API_ENDPOINT + 'questionnaire/dash-weekly-questionnaire', {
					headers: this.getHeaders(true),
				})
				.subscribe(
				res => this.successCallback(res, resolve, reject),
				err => this.errorCallback(err, resolve, reject)
				);
		});
	}
	C;
	/**
	 * @param type 
	 * @desc Function is used to get questionnaire accroding to type like FACT_G7,PRO-CTCAE etc.
	 */

	get_questionnaire(querystring) {
		this.spinnerService.show();
		return new Promise((resolve, reject) => {
			this.http
				.get(CONSTANTS.API_ENDPOINT + 'questionnaire/questionnaire?' + querystring, {
					headers: this.getHeaders(true),
				})
				.subscribe(
				res => this.successCallback(res, resolve, reject),
				err => this.errorCallback(err, resolve, reject)
				);
		});
	}

	/**
	 * @param data 
	 * @desc Function is used to save questionnaire answer given by user.
	 */

	save_questionnaire(data) {
		this.spinnerService.show();
		return new Promise((resolve, reject) => {
			this.http
				.post(CONSTANTS.API_ENDPOINT + 'questionnaire/answer', data, { headers: this.getHeaders(true) })
				.subscribe(
				res => this.successCallback(res, resolve, reject),
				err => this.errorCallback(err, resolve, reject)
				);
		});
	}

	/**
	 * @desc Function is used to get cps question.
	 */

	get_cps() {
		this.spinnerService.show();
		return new Promise((resolve, reject) => {
			this.http
				.get(CONSTANTS.API_ENDPOINT + 'questionnaire/cps', {
					headers: this.getHeaders(true),
				})
				.subscribe(
				res => this.successCallback(res, resolve, reject),
				err => this.errorCallback(err, resolve, reject)
				);
		});
	}

	/**
	 * @param data 
	 * @desc Function is used to save cps response given by user.
	 */

	save_cps(data) {
		this.spinnerService.show();
		return new Promise((resolve, reject) => {
			this.http
				.post(CONSTANTS.API_ENDPOINT + 'questionnaire/cps', data, { headers: this.getHeaders(true) })
				.subscribe(
				res => this.successCallback(res, resolve, reject),
				err => this.errorCallback(err, resolve, reject)
				);
		});
	}

	/**
	 * @desc Function is used to get current running week information.
	 */

	get_current_week() {
		return new Promise((resolve, reject) => {
			this.http
				.get(CONSTANTS.API_ENDPOINT + 'questionnaire/week-info', {
					headers: this.getHeaders(true),
				})
				.subscribe(
				res => this.successCallback(res, resolve, reject),
				err => this.errorCallback(err, resolve, reject)
				);
		});
	}

	/**
	 * @desc Function is used to get cps question.
	*/

	get_promis_data() {
		this.spinnerService.show();
		return new Promise((resolve, reject) => {
			this.http
				.get(CONSTANTS.API_ENDPOINT + 'questionnaire/promis-questionnaire', {
					headers: this.getHeaders(true),
				})
				.subscribe(
				res => this.successCallback(res, resolve, reject),
				err => this.errorCallback(err, resolve, reject)
				);
		});
	}

	/**
	 * @param data 
	 * @desc Function is used to save promis response given by user.
	 */

	save_promis(data) {
		this.spinnerService.show();
		return new Promise((resolve, reject) => {
			this.http
				.post(CONSTANTS.API_ENDPOINT + 'questionnaire/promis-questionnaire', data, {
					headers: this.getHeaders(true),
				})
				.subscribe(
				res => this.successCallback(res, resolve, reject),
				err => this.errorCallback(err, resolve, reject)
				);
		});
	}

	/**
	 * @param data 
	 * @desc Function is used to save promis response given by user.
	 */

	promis_result(data) {
		return new Promise((resolve, reject) => {
			this.http
				.post(CONSTANTS.API_ENDPOINT + 'questionnaire/promis_result', data, { headers: this.getHeaders(true) })
				.subscribe(
				res => this.successCallback(res, resolve, reject),
				err => this.errorCallback(err, resolve, reject)
				);
		});
	}
	/**
	 * @param data 
	 * @desc Function is used to get common elevated symptoms promis response given by user.
	 */

	common_elevated_symptoms() {
		return new Promise((resolve, reject) => {
			this.http
				.get(CONSTANTS.API_ENDPOINT + 'user/common-elevated-symptoms', {
					headers: this.getHeaders(true),
				})
				.subscribe(
				res => this.successCallback(res, resolve, reject),
				err => this.errorCallback(err, resolve, reject)
				);
		});
	}

	/**
	 * @desc Function is used to add assessment id and get promis type.
	 */

	add_promis_assessments() {
		return new Promise((resolve, reject) => {
			this.http
				.get(CONSTANTS.API_ENDPOINT + 'questionnaire/add-promis-assessments', { headers: this.getHeaders(true) })
				.subscribe(
				res => this.successCallback(res, resolve, reject),
				err => this.errorCallback(err, resolve, reject)
				);
		});
	}
}
