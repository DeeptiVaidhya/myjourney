import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { CONSTANTS } from '../config/constants';
import { HelperService } from './helper.service';

@Injectable()
export class AuthService {
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
	 * @desc Calling api for for user login with username/email and password
	 * @param credentials 
	 */
	login(credentials): Observable<any> {
		return this.helperService.makeHttpRequest('auth/login', 'post', credentials);
	}

	/**
	 * @desc Function is used to check a user is logged in or not called every time 
	 * 		 when a user performs any activity in application
	 */
	check_login(): Observable<any> {
		return this.helperService.makeHttpRequest('auth/check-login', 'post', {},true);
	}

	/**
	 * @desc Check a user's email is unique or not, called when adding a patient/provider from research staff or from edit profile
	 * @param data 
	 */
	// isEmailUnique(data) {
	// 	return new Promise((resolve, reject) => {
	// 		this.http.post(CONSTANTS.API_ENDPOINT + 'auth/check-email', data, { headers: this.getHeaders() }).subscribe(
	// 			res => this.successCallback(res, resolve, reject),
	// 			err => this.errorCallback(err, resolve, reject)
	// 		);
	// 	});
	// }
	isEmailUnique(data): Observable<any> {
		return this.helperService.makeHttpRequest('auth/check-email', 'post', data);
	}
	/**
	 * @desc Check access code to reset password of a user.
	 * @param data 
	 */
	// checkAccessCode(data) {
	// 	return new Promise((resolve, reject) => {
	// 		this.http.post(CONSTANTS.API_ENDPOINT + 'auth/check-access-code', data, { headers: this.getHeaders() }).subscribe(
	// 			res => this.successCallback(res, resolve, reject),
	// 			err => this.errorCallback(err, resolve, reject)
	// 		);
	// 	});
	// }

	/**
	 * @desc Adding a user like patient/provider, called from research staff
	 * @param data 
	 */
	// addUser(data) {
	// 	this.spinnerService.show();
	// 	return new Promise((resolve, reject) => {
	// 		this.http.post(CONSTANTS.API_ENDPOINT + 'user/user', data, { headers: this.getHeaders(true) }).subscribe(
	// 			res => this.successCallback(res, resolve, reject),
	// 			err => this.errorCallback(err, resolve, reject)
	// 		);
	// 	});
	// }
	addUser(data): Observable<any> {
		return this.helperService.makeHttpRequest('auth/check-email', 'post', data,true);
	}

	/**
	 * @desc changing status of users for which email is sent from research staff, called from research staff dashboard
	 * @param data 
	 */
	// elevatedSymptomsSendMail(data) {
	// 	return new Promise((resolve, reject) => {
	// 		this.http.post(CONSTANTS.API_ENDPOINT + 'user/elevated-patients-send-mail', data, { headers: this.getHeaders(true) }).subscribe(
	// 			res => this.successCallback(res, resolve, reject),
	// 			err => this.errorCallback(err, resolve, reject)
	// 		);
	// 	});
	// }
	elevatedSymptomsSendMail(data): Observable<any> {
		return this.helperService.makeHttpRequest('user/elevated-patients-send-mail', 'post', data,true);
	}




	/**
	 * @desc Getting users according to their type like patient/research-staff/provider
	 */
	// getElevatedPatients() {
	// 	return new Promise((resolve, reject) => {
	// 		this.http.get(CONSTANTS.API_ENDPOINT + 'user/elevated-patients', { headers: this.getHeaders(true) }).subscribe(
	// 			res => this.successCallback(res, resolve, reject),
	// 			err => this.errorCallback(err, resolve, reject)
	// 		);
	// 	});
	// }
	getElevatedPatients(): Observable<any> {
		return this.helperService.makeHttpRequest('user/elevated-patients', 'get', {},true);
	}

	/**
	 * @desc Getting users according to their type like patient/research-staff/provider
	 */
	// getUser(user_type,is_active = false) {
	// 	this.spinnerService.show();
	// 	return new Promise((resolve, reject) => {
	// 		this.http.get(CONSTANTS.API_ENDPOINT + 'user/user/?user_type=' + user_type+(is_active?'&is_active=true':''), { headers: this.getHeaders(true) }).subscribe(
	// 			res => this.successCallback(res, resolve, reject),
	// 			err => this.errorCallback(err, resolve, reject)
	// 		);
	// 	});
	// }
	getUser(user_type,is_active = false): Observable<any> {
		return this.helperService.makeHttpRequest('user/user/?user_type=' + user_type+(is_active?'&is_active=true':''), 'get', {},true);
	}

	/**
	 * @desc Getting all cancer type used within the application
	 */
	// getCancerList() {
	// 	return new Promise((resolve, reject) => {
	// 		this.http.get(CONSTANTS.API_ENDPOINT + 'user/cancer-type', { headers: this.getHeaders(true) }).subscribe(
	// 			res => this.successCallback(res, resolve, reject),
	// 			err => this.errorCallback(err, resolve, reject)
	// 		);
	// 	});
	// }
	getCancerList(): Observable<any> {
		return this.helperService.makeHttpRequest('user/cancer-type', 'post', {},true);
	}

	/**
	 * @desc Function is used to get user details for a paticular user.
	 * @param input 
	 */
	// getUserDetail(input) {
	// 	return new Promise((resolve, reject) => {
	// 		this.http.post(CONSTANTS.API_ENDPOINT + 'user/user-detail', input, { headers: this.getHeaders(true) }).subscribe(
	// 			res => this.successCallback(res, resolve, reject),
	// 			err => this.errorCallback(err, resolve, reject)
	// 		);
	// 	});
	// }
	getUserDetail(data): Observable<any> {
		return this.helperService.makeHttpRequest('user/user-detail', 'post', data,true);
	}

	/**
	 * 
	 * @param data 
	 * @desc Check whether a Subject Id is assigned to a patient or not
	 * Called from Research Staff Add patient Section
	 */
	// isSubjectIdUnique(data) {
	// 	return new Promise((resolve, reject) => {
	// 		this.http.post(CONSTANTS.API_ENDPOINT + 'auth/check-subject-id', data, { headers: this.getHeaders() }).subscribe(
	// 			res => this.successCallback(res, resolve, reject),
	// 			err => this.errorCallback(err, resolve, reject)
	// 		);
	// 	});
	// }
	isSubjectIdUnique(data): Observable<any> {
		return this.helperService.makeHttpRequest('auth/check-subject-id', 'post', data);
	}

	/**
	 * @desc Checking a username is taken of not, used when a user edits his/her profile
	 * @param data 
	 */
	// isUsernameRegistered(data) {
	// 	return new Promise((resolve, reject) => {
	// 		this.http.post(CONSTANTS.API_ENDPOINT + 'auth/check-username', data, { headers: this.getHeaders() }).subscribe(
	// 			res => this.successCallback(res, resolve, reject),
	// 			err => this.errorCallback(err, resolve, reject)
	// 		);
	// 	});
	// }
	isUsernameRegistered(data): Observable<any> {
		return this.helperService.makeHttpRequest('auth/check-username', 'post', data);
	}

	/**
	 * @desc Get profile details for a patient/provider/researcher
	 */
	// get_profile() {
	// 	return new Promise((resolve, reject) => {
	// 		this.http.get(CONSTANTS.API_ENDPOINT + 'auth/profile', { headers: this.getHeaders(true) }).subscribe(
	// 			res => this.successCallback(res, resolve, reject),
	// 			err => this.errorCallback(err, resolve, reject)
	// 		);
	// 	});
	// }
	get_profile(): Observable<any> {
		return this.helperService.makeHttpRequest('auth/profile', 'get', {},true);
	}

	/**
	 * @desc Cheching a password entered is correct or not, called from edit profile page
	 * @param data 
	 */
	// isCurrentPassword(data) {
	// 	return new Promise((resolve, reject) => {
	// 		this.http.post(CONSTANTS.API_ENDPOINT + 'auth/check-password', data, { headers: this.getHeaders(true) }).subscribe(
	// 			res => this.successCallback(res, resolve, reject),
	// 			err => this.errorCallback(err, resolve, reject)
	// 		);
	// 	});
	// }
	isCurrentPassword(data): Observable<any> {
		return this.helperService.makeHttpRequest('auth/check-password', 'post', data,true);
	}


	/**
	 * @desc Cheching a password entered is previous or not, called from edit profile page
	 * @param data 
	 */
	// isPreviousPassword(data) {
	// 	return new Promise((resolve, reject) => {
	// 		this.http.post(CONSTANTS.API_ENDPOINT + 'auth/check-previous-password', data, { headers: this.getHeaders(true) }).subscribe(
	// 			res => this.successCallback(res, resolve, reject),
	// 			err => this.errorCallback(err, resolve, reject)
	// 		);
	// 	});
	// }
	isPreviousPassword(data): Observable<any> {
		return this.helperService.makeHttpRequest('auth/check-previous-password', 'post', data,true);
	}

	/**
	 * @desc Updating profile for each user type like research-staff, patient and provider
	 * @param data 
	 */
	// update_profile(data) {
	// 	return new Promise((resolve, reject) => {
	// 		this.http.post(CONSTANTS.API_ENDPOINT + 'auth/profile', data, { headers: this.getHeaders(true) }).subscribe(
	// 			res => this.successCallback(res, resolve, reject),
	// 			err => this.errorCallback(err, resolve, reject)
	// 		);
	// 	});
	// }
	update_profile(data): Observable<any> {
		return this.helperService.makeHttpRequest('auth/profile', 'post', data,true);
	}

	/**
	 * @desc Logout function for each user.
	 */
	// logout() {
	// 	return new Promise((resolve, reject) => {
	// 		this.http.get(CONSTANTS.API_ENDPOINT + 'auth/logout', { headers: this.getHeaders(true) }).subscribe(
	// 			res => this.successCallback(res, resolve, reject),
	// 			err => this.errorCallback(err, resolve, reject)
	// 		);
	// 	});
	// }
	logout(): Observable<any> {
		return this.helperService.makeHttpRequest('auth/logout', 'get', {},true);
	}


	/**
	 * @desc Update a user like patient/provider, called from research staff
	 * @param data 
	 */
	updateUser(data) {
		// return new Promise((resolve, reject) => {
		// 	this.http.put(CONSTANTS.API_ENDPOINT + 'user/user', data, { headers: this.getHeaders(true) }).subscribe(
		// 		res => this.successCallback(res, resolve, reject),
		// 		err => this.errorCallback(err, resolve, reject)
		// 	);
		// });
		return this.helperService.makeHttpRequest('user/user', 'put', data,true);

	}
	/**
	 * @desc Delete genomic report of user
	 * @param data 
	 */
	// delete_genomic_report_user(data) {
	// 	return new Promise((resolve, reject) => {
	// 		this.http.put(CONSTANTS.API_ENDPOINT + 'user/upload_document', data, { headers: this.getHeaders(true) }).subscribe(
	// 			res => this.successCallback(res, resolve, reject),
	// 			err => this.errorCallback(err, resolve, reject)
	// 		);
	// 	});
	// }
	delete_genomic_report_user(data): Observable<any> {
		return this.helperService.makeHttpRequest('auth/upload-document', 'put', data,true);
	}


	/**
	 * @desc Getting users according to their type like patient/research-staff/provider
	 * @param user id
	 */
	// get_patient_report(user_id) {
	// 	let param = user_id ? '?user_id=' + user_id : '';
	// 	this.spinnerService.show();
	// 	return new Promise((resolve, reject) => {
	// 		this.http.get(CONSTANTS.API_ENDPOINT + 'user/report' + param, { headers: this.getHeaders(true) }).subscribe(
	// 			res => this.successCallback(res, resolve, reject),
	// 			err => this.errorCallback(err, resolve, reject)
	// 		);
	// 	});
	// }
	get_patient_report(user_id): Observable<any> {
		return this.helperService.makeHttpRequest('user/report'+(user_id ? '?user_id=' + user_id : ''), 'get', {},true);
	}


	/**
	 * @desc create user password 
	 */
	// change_password(data) {
	// 	return new Promise((resolve, reject) => {
	// 		this.http.post(CONSTANTS.API_ENDPOINT + 'auth/reset_password', data, { headers: this.getHeaders(false) }).subscribe(
	// 			res => this.successCallback(res, resolve, reject),
	// 			err => this.errorCallback(err, resolve, reject)
	// 		);
	// 	});
	// }
	change_password(data): Observable<any> {
		return this.helperService.makeHttpRequest('auth/reset-password', 'post', data);
	}


	/**
	 * @desc check reset password code 
	 */

	// reset_password_code(data) {
	// 	return new Promise((resolve, reject) => {
	// 		const headers = new Headers({
	// 			'Content-Type': 'application/x-www-form-urlencoded',
	// 			Authorization: 'Basic ' + CONSTANTS.AUTH,
	// 		});
	// 		this.http.post(CONSTANTS.API_ENDPOINT + 'auth/reset_password_code', data, { headers: headers }).subscribe(
	// 			res => this.successCallback(res, resolve, reject),
	// 			err => this.errorCallback(err, resolve, reject)
	// 		);
	// 	});
	// }
	reset_password_code(data): Observable<any> {
		return this.helperService.makeHttpRequest('auth/reset-password-code', 'post', data);
	}


	/**
	 * @desc Calling api for forgot Password 
	 * @param data 
	*/
	// forgot_password(data) {
	// 	this.spinnerService.show();
	// 	return new Promise((resolve, reject) => {
	// 		this.http.post(CONSTANTS.API_ENDPOINT + 'auth/forgot_password', data, { headers: this.getHeaders() }).subscribe(
	// 			res => this.successCallback(res, resolve, reject),
	// 			err => this.errorCallback(err, resolve, reject)
	// 		);
	// 	});
	// }
	forgot_password(data): Observable<any> {
		return this.helperService.makeHttpRequest('auth/forgot-password', 'post', data);
	}
	/**
	 * @desc Calling api for forgot Password 
	 * @param data 
	*/
	// generate_access_code(data) {
	// 	this.spinnerService.show();
	// 	return new Promise((resolve, reject) => {
	// 		this.http.post(CONSTANTS.API_ENDPOINT + 'auth/generate_access_code', data, { headers: this.getHeaders() }).subscribe(
	// 			res => this.successCallback(res, resolve, reject),
	// 			err => this.errorCallback(err, resolve, reject)
	// 		);
	// 	});
	// }
	generate_access_code(data): Observable<any> {
		return this.helperService.makeHttpRequest('auth/generate-access-code', 'post', data);
	}
	/**
	 * @desc Calling api for change status
	 * @param data 
	*/
	// change_active_status(data) {
	// 	this.spinnerService.show();
	// 	return new Promise((resolve, reject) => {
	// 		this.http.post(CONSTANTS.API_ENDPOINT + 'auth/change_active_status', data, { headers: this.getHeaders() }).subscribe(
	// 			res => this.successCallback(res, resolve, reject),
	// 			err => this.errorCallback(err, resolve, reject)
	// 		);
	// 	});
	// }
	change_active_status(data): Observable<any> {
		return this.helperService.makeHttpRequest('auth/change-active-status', 'post', data);
	}


	/**
	 * @desc Calling api for Contact US 
	 * @param data 
	*/
	// contact_us(data) {
	// 	this.spinnerService.show();
	// 	return new Promise((resolve, reject) => {
	// 		this.http.post(CONSTANTS.API_ENDPOINT + 'auth/contact_us', data, { headers: this.getHeaders() }).subscribe(
	// 			res => this.successCallback(res, resolve, reject),
	// 			err => this.errorCallback(err, resolve, reject)
	// 		);
	// 	});
	// }
	contact_us(data): Observable<any> {
		return this.helperService.makeHttpRequest('auth/contact-us', 'post', data);
	}

}
