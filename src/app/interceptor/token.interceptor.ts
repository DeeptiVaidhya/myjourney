import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONSTANTS } from '../config/constants';
import { HelperService } from '../service/helper.service';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	constructor(public helper: HelperService) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let obj = {
			'Content-Type': 'application/x-www-form-urlencoded',
			Authorization: 'Basic ' + CONSTANTS.AUTH,
		};
		// console.log(this.helper.isAuthenticated(),this.helper.getToken());
		this.helper.isAuthenticated() && (obj['Token'] = this.helper.getToken() || '');
		/*.subscribe(token => {
				obj['Token'] = token; // should be 'Henri'
			})*/;
		// console.log(obj);
		request = request.clone({
			setHeaders: obj,
		});
		return next.handle(request);
	}
}
