import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import 'rxjs/add/operator/map';
import { CONSTANTS } from '../config/constants';

@Injectable()
export class AuthService {
	constructor(private http: Http, private spinnerService: Ng4LoadingSpinnerService) { }
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
	login(credentials) {
		return new Promise((resolve, reject) => {
			this.http.post(CONSTANTS.API_ENDPOINT + 'auth/login', credentials, { headers: this.getHeaders() }).subscribe(
				res => this.successCallback(res, resolve, reject),
				err => this.errorCallback(err, resolve, reject)
			);
		});
	}

	/**
	 * @desc Function is used to check a user is logged in or not called every time 
	 * 		 when a user performs any activity in application
	 */
	check_login() {
		return new Promise((resolve, reject) => {
			this.http.post(CONSTANTS.API_ENDPOINT + 'auth/check-login', {}, { headers: this.getHeaders(true) }).subscribe(
				res => this.successCallback(res, resolve, reject),
				err => this.errorCallback(err, resolve, reject)
			);
		});
	}

	/**
	 * @desc Check a user's email is unique or not, called when adding a patient/provider from research staff or from edit profile
	 * @param data 
	 */
	isEmailUnique(data) {
		return new Promise((resolve, reject) => {
			this.http.post(CONSTANTS.API_ENDPOINT + 'auth/check-email', data, { headers: this.getHeaders() }).subscribe(
				res => this.successCallback(res, resolve, reject),
				err => this.errorCallback(err, resolve, reject)
			);
		});
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
	addUser(data) {
		this.spinnerService.show();
		return new Promise((resolve, reject) => {
			this.http.post(CONSTANTS.API_ENDPOINT + 'user/user', data, { headers: this.getHeaders(true) }).subscribe(
				res => this.successCallback(res, resolve, reject),
				err => this.errorCallback(err, resolve, reject)
			);
		});
	}

	/**
	 * @desc changing status of users for which email is sent from research staff, called from research staff dashboard
	 * @param data 
	 */
	elevatedSymptomsSendMail(data) {
		return new Promise((resolve, reject) => {
			this.http.post(CONSTANTS.API_ENDPOINT + 'user/elevated-patients-send-mail', data, { headers: this.getHeaders(true) }).subscribe(
				res => this.successCallback(res, resolve, reject),
				err => this.errorCallback(err, resolve, reject)
			);
		});
	}




	/**
	 * @desc Getting users according to their type like patient/research-staff/provider
	 */
	getElevatedPatients() {
		return new Promise((resolve, reject) => {
			this.http.get(CONSTANTS.API_ENDPOINT + 'user/elevated-patients', { headers: this.getHeaders(true) }).subscribe(
				res => this.successCallback(res, resolve, reject),
				err => this.errorCallback(err, resolve, reject)
			);
		});
	}

	/**
	 * @desc Getting users according to their type like patient/research-staff/provider
	 */
	getUser(user_type,is_active = false) {
		this.spinnerService.show();
		return new Promise((resolve, reject) => {
			this.http.get(CONSTANTS.API_ENDPOINT + 'user/user/?user_type=' + user_type+(is_active?'&is_active=true':''), { headers: this.getHeaders(true) }).subscribe(
				res => this.successCallback(res, resolve, reject),
				err => this.errorCallback(err, resolve, reject)
			);
		});
	}

	/**
	 * @desc Getting all cancer type used within the application
	 */
	getCancerList() {
		return new Promise((resolve, reject) => {
			this.http.get(CONSTANTS.API_ENDPOINT + 'user/cancer-type', { headers: this.getHeaders(true) }).subscribe(
				res => this.successCallback(res, resolve, reject),
				err => this.errorCallback(err, resolve, reject)
			);
		});
	}

	/**
	 * @desc Function is used to get user details for a paticular user.
	 * @param input 
	 */
	getUserDetail(input) {
		return new Promise((resolve, reject) => {
			this.http.post(CONSTANTS.API_ENDPOINT + 'user/user-detail', input, { headers: this.getHeaders(true) }).subscribe(
				res => this.successCallback(res, resolve, reject),
				err => this.errorCallback(err, resolve, reject)
			);
		});
	}

	/**
	 * 
	 * @param data 
	 * @desc Check whether a Subject Id is assigned to a patient or not
	 * Called from Research Staff Add patient Section
	 */
	isSubjectIdUnique(data) {
		return new Promise((resolve, reject) => {
			this.http.post(CONSTANTS.API_ENDPOINT + 'auth/check-subject-id', data, { headers: this.getHeaders() }).subscribe(
				res => this.successCallback(res, resolve, reject),
				err => this.errorCallback(err, resolve, reject)
			);
		});
	}

	/**
	 * @desc Checking a username is taken of not, used when a user edits his/her profile
	 * @param data 
	 */
	isUsernameRegistered(data) {
		return new Promise((resolve, reject) => {
			this.http.post(CONSTANTS.API_ENDPOINT + 'auth/check-username', data, { headers: this.getHeaders() }).subscribe(
				res => this.successCallback(res, resolve, reject),
				err => this.errorCallback(err, resolve, reject)
			);
		});
	}

	/**
	 * @desc Get profile details for a patient/provider/researcher
	 */
	get_profile() {
		return new Promise((resolve, reject) => {
			this.http.get(CONSTANTS.API_ENDPOINT + 'auth/profile', { headers: this.getHeaders(true) }).subscribe(
				res => this.successCallback(res, resolve, reject),
				err => this.errorCallback(err, resolve, reject)
			);
		});
	}

	/**
	 * @desc Cheching a password entered is correct or not, called from edit profile page
	 * @param data 
	 */
	isCurrentPassword(data) {
		return new Promise((resolve, reject) => {
			this.http.post(CONSTANTS.API_ENDPOINT + 'auth/check-password', data, { headers: this.getHeaders(true) }).subscribe(
				res => this.successCallback(res, resolve, reject),
				err => this.errorCallback(err, resolve, reject)
			);
		});
	}


	/**
	 * @desc Cheching a password entered is previous or not, called from edit profile page
	 * @param data 
	 */
	isPreviousPassword(data) {
		return new Promise((resolve, reject) => {
			this.http.post(CONSTANTS.API_ENDPOINT + 'auth/check-previous-password', data, { headers: this.getHeaders(true) }).subscribe(
				res => this.successCallback(res, resolve, reject),
				err => this.errorCallback(err, resolve, reject)
			);
		});
	}

	/**
	 * @desc Updating profile for each user type like research-staff, patient and provider
	 * @param data 
	 */
	update_profile(data) {
		return new Promise((resolve, reject) => {
			this.http.post(CONSTANTS.API_ENDPOINT + 'auth/profile', data, { headers: this.getHeaders(true) }).subscribe(
				res => this.successCallback(res, resolve, reject),
				err => this.errorCallback(err, resolve, reject)
			);
		});
	}

	/**
	 * @desc Logout function for each user.
	 */
	logout() {
		return new Promise((resolve, reject) => {
			this.http.get(CONSTANTS.API_ENDPOINT + 'auth/logout', { headers: this.getHeaders(true) }).subscribe(
				res => this.successCallback(res, resolve, reject),
				err => this.errorCallback(err, resolve, reject)
			);
		});
	}


	/**
	 * @desc Update a user like patient/provider, called from research staff
	 * @param data 
	 */
	updateUser(data) {
		return new Promise((resolve, reject) => {
			this.http.put(CONSTANTS.API_ENDPOINT + 'user/user', data, { headers: this.getHeaders(true) }).subscribe(
				res => this.successCallback(res, resolve, reject),
				err => this.errorCallback(err, resolve, reject)
			);
		});
	}
	/**
	 * @desc Delete genomic report of user
	 * @param data 
	 */
	delete_genomic_report_user(data) {
		return new Promise((resolve, reject) => {
			this.http.put(CONSTANTS.API_ENDPOINT + 'user/upload_document', data, { headers: this.getHeaders(true) }).subscribe(
				res => this.successCallback(res, resolve, reject),
				err => this.errorCallback(err, resolve, reject)
			);
		});
	}


	/**
	 * @desc Getting users according to their type like patient/research-staff/provider
	 * @param user id
	 */
	get_patient_report(user_id) {
		let param = user_id ? '?user_id=' + user_id : '';
		this.spinnerService.show();
		return new Promise((resolve, reject) => {
			this.http.get(CONSTANTS.API_ENDPOINT + 'user/report' + param, { headers: this.getHeaders(true) }).subscribe(
				res => this.successCallback(res, resolve, reject),
				err => this.errorCallback(err, resolve, reject)
			);
		});
	}


	/**
	 * @desc create user password 
	 */
	change_password(data) {
		return new Promise((resolve, reject) => {
			this.http.post(CONSTANTS.API_ENDPOINT + 'auth/reset_password', data, { headers: this.getHeaders(false) }).subscribe(
				res => this.successCallback(res, resolve, reject),
				err => this.errorCallback(err, resolve, reject)
			);
		});
	}


	/**
	 * @desc check reset password code 
	 */

	reset_password_code(data) {
		return new Promise((resolve, reject) => {
			const headers = new Headers({
				'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: 'Basic ' + CONSTANTS.AUTH,
			});
			this.http.post(CONSTANTS.API_ENDPOINT + 'auth/reset_password_code', data, { headers: headers }).subscribe(
				res => this.successCallback(res, resolve, reject),
				err => this.errorCallback(err, resolve, reject)
			);
		});
	}


	/**
	 * @desc Calling api for forgot Password 
	 * @param data 
	*/
	forgot_password(data) {
		this.spinnerService.show();
		return new Promise((resolve, reject) => {
			this.http.post(CONSTANTS.API_ENDPOINT + 'auth/forgot_password', data, { headers: this.getHeaders() }).subscribe(
				res => this.successCallback(res, resolve, reject),
				err => this.errorCallback(err, resolve, reject)
			);
		});
	}
	/**
	 * @desc Calling api for forgot Password 
	 * @param data 
	*/
	generate_access_code(data) {
		this.spinnerService.show();
		return new Promise((resolve, reject) => {
			this.http.post(CONSTANTS.API_ENDPOINT + 'auth/generate_access_code', data, { headers: this.getHeaders() }).subscribe(
				res => this.successCallback(res, resolve, reject),
				err => this.errorCallback(err, resolve, reject)
			);
		});
	}
	/**
	 * @desc Calling api for change status
	 * @param data 
	*/
	change_active_status(data) {
		this.spinnerService.show();
		return new Promise((resolve, reject) => {
			this.http.post(CONSTANTS.API_ENDPOINT + 'auth/change_active_status', data, { headers: this.getHeaders() }).subscribe(
				res => this.successCallback(res, resolve, reject),
				err => this.errorCallback(err, resolve, reject)
			);
		});
	}


	/**
	 * @desc Calling api for Contact US 
	 * @param data 
	*/
	contact_us(data) {
		this.spinnerService.show();
		return new Promise((resolve, reject) => {
			this.http.post(CONSTANTS.API_ENDPOINT + 'auth/contact_us', data, { headers: this.getHeaders() }).subscribe(
				res => this.successCallback(res, resolve, reject),
				err => this.errorCallback(err, resolve, reject)
			);
		});
	}
}
