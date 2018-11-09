import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { CONSTANTS } from '../config/constants';
declare var ga: Function;
@Injectable()
export class GoogleAnalyticsEventsService {


	os = [
		{ name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
		{ name: 'Windows', value: 'Win', version: 'NT' },
		{ name: 'iPhone', value: 'iPhone', version: 'OS' },
		{ name: 'iPad', value: 'iPad', version: 'OS' },
		{ name: 'Kindle', value: 'Silk', version: 'Silk' },
		{ name: 'Android', value: 'Android', version: 'Android' },
		{ name: 'PlayBook', value: 'PlayBook', version: 'OS' },
		{ name: 'BlackBerry', value: 'BlackBerry', version: '/' },
		{ name: 'Macintosh', value: 'Mac', version: 'OS X' },
		{ name: 'Linux', value: 'Linux', version: 'rv' },
		{ name: 'Palm', value: 'Palm', version: 'PalmOS' }
	];

	browser = [
		{ name: 'Chrome', value: 'Chrome', version: 'Chrome' },
		{ name: 'Firefox', value: 'Firefox', version: 'Firefox' },
		{ name: 'Safari', value: 'Safari', version: 'Version' },
		{ name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' },
		{ name: 'Opera', value: 'Opera', version: 'Opera' },
		{ name: 'BlackBerry', value: 'CLDC', version: 'CLDC' },
		{ name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' }
	];


	header = [
		navigator.platform,
		navigator.userAgent,
		navigator.appVersion,
		navigator.vendor,
		window['opera']
	];
	constructor(private http: Http) {}
	public emitEvent(
		eventCategory: string,
		eventAction: string,
		eventLabel: string = null,
		eventValue: number = null,
		type: string
	) {
		const data = {
			eventCategory: eventCategory,
			eventLabel: eventLabel,
			eventAction: eventAction,
			eventValue: eventValue,
		};
		ga('send', 'event', data);
		data['type'] = type;
		return new Promise((resolve, reject) => {
			const headers = new Headers({
				'Content-Type': 'application/x-www-form-urlencoded',
			});
			headers.append('Authorization', 'Basic ' + CONSTANTS.AUTH);
			headers.append('Token', localStorage.getItem('token'));

			let browserName = navigator.appName,
				nameOffset, verOffset,
				nAgt = navigator.userAgent;
			// In Opera, the true version is after "Opera" or after "Version"
			if ((verOffset = nAgt.indexOf('Opera')) != -1) {
				browserName = 'Opera';
			} else if ((verOffset = nAgt.indexOf('MSIE')) != -1 ||(verOffset = nAgt.indexOf('Trident')) != -1) {
				// In MSIE, the true version is after "MSIE" in userAgent
				browserName = 'Microsoft Internet Explorer';
			} else if ((verOffset = nAgt.indexOf('Chrome')) != -1 || (verOffset = nAgt.indexOf('CriOS')) != -1) {
				// In Chrome, the true version is after "Chrome"
				browserName = 'Chrome';
			}else if ((verOffset = nAgt.indexOf('GSA')) != -1) {
				// In GSA, the true version is after "GSA"
				browserName = 'Google Search Appliance';
			} else if ((verOffset = nAgt.indexOf('Firefox')) != -1 || (verOffset = nAgt.indexOf('FxiOS')) != -1) {
				// In Firefox, the true version is after "Firefox"
				browserName = 'Firefox';
			} else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
				// In Safari, the true version is after "Safari" or after "Version"
				browserName = 'Safari';
			} else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
				// In most other browsers, "name/version" is at the end of userAgent
				browserName = nAgt.substring(nameOffset, verOffset);
				if (browserName.toLowerCase() == browserName.toUpperCase()) {
					browserName = navigator.appName;
				}
			}

			let device_info = 'OS: ' + navigator.platform + ', ' + 'Browser: ' + browserName;
			data['device_info'] = device_info;
			this.http.post(CONSTANTS.API_ENDPOINT + 'user/user-activity', data, { headers: headers }).subscribe(
				(res: any) => {
					//console.log('res is', res);
				},
				error => {
					//console.log('error');
				}
			);
		});
	}

	matchItem(string, data) {
		var i = 0,
			j = 0,
			html = '',
			regex,
			regexv,
			match,
			matches,
			version;

		for (i = 0; i < data.length; i += 1) {
			regex = new RegExp(data[i].value, 'i');
			match = regex.test(string);
			if (match) {
				regexv = new RegExp(data[i].version + '[- /:;]([d._]+)', 'i');
				matches = string.match(regexv);
				version = '';
				if (matches) {
					if (matches[1]) {
						matches = matches[1];
					}
				}
				if (matches) {
					matches = matches.split(/[._]+/);
					for (j = 0; j < matches.length; j += 1) {
						if (j === 0) {
							version += matches[j] + '.';
						} else {
							version += matches[j];
						}
					}
				} else {
					version = '0';
				}
				return {
					name: data[i].name,
					version: parseFloat(version),
				};
			}
		}
		return { name: 'unknown', version: 0 };
	}
}
