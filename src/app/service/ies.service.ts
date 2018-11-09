import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { CONSTANTS } from '../config/constants';

@Injectable()
export class IesService {

	constructor(private http: Http) { }

	// Set Header for request

	getHeaders() {
		const headers = new Headers({
			'Content-Type': 'application/x-www-form-urlencoded',
		});
		headers.append('Authorization', 'Basic ' + CONSTANTS.AUTH);
		headers.append('token', localStorage.getItem('token'));
		return headers;
	}


	// Calling api for save answer given by user
	save_ies(data) {
		return new Promise((resolve, reject) => {
			const headers = this.getHeaders();
			this.http
				.post(CONSTANTS.API_ENDPOINT + 'ies/ies', data, { headers: headers })
				.subscribe(
				result => {
					const contentType = result.headers.get('Content-type');
					if (contentType.indexOf('application/json') !== -1) {
						resolve(result.json());
					} else {
						console.log(result);
						reject({ status: 'error', msg: 'Invalid response' });
					}
				},
				errors => {
					const contentType = errors.headers.get('Content-type');
					if (contentType === 'application/json') {
						reject(errors.json().join());
					} else {
						console.log(errors);
						reject({ status: 'error', msg: 'Invalid response' });
					}
				}
				);
		});
	}


	// Calling api for get answer given by user
	get_answer() {
		return new Promise((resolve, reject) => {
			const headers = this.getHeaders();
			this.http
				.get(CONSTANTS.API_ENDPOINT + 'ies/ies', { headers: headers })
				.subscribe(
				result => {
					const contentType = result.headers.get('Content-type');
					if (contentType.indexOf('application/json') !== -1) {
						resolve(result.json());
					} else {
						console.log(result);
						reject({ status: 'error', msg: 'Invalid response' });
					}
				},
				errors => {
					const contentType = errors.headers.get('Content-type');
					if (contentType === 'application/json') {
						reject(errors.json().join());
					} else {
						console.log(errors);
						reject({ status: 'error', msg: 'Invalid response' });
					}
				}
				);
		});
	}

}
