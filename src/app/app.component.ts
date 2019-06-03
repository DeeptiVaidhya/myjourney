import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { ToastrService } from 'ngx-toastr';
import { CONSTANTS } from './config/constants';
import { AuthService } from './service/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
	maIsOpen: boolean;
	public role: any;
	link: any;

	public isLoggedIn: Boolean = true;
	public isWeekStarted:boolean;
	public armAllocate:string;
	// Auto logout variables
	idleState = 'Not started.';
	timedOut = false;
	isHeaderHidden = false;
	lastPing?: Date = null;

	pathsWtLogin: any = [
		'/home',
		'/about-us',
		'/contact-us',
		'/faq',
		'/terms-conditions',
		'/create-password',
		'/forgot-password',
		'/reset-password',
	];

	constructor(
		private router: Router,
		private authService: AuthService,
		public toastr: ToastrService,
		private idle: Idle,
	) {
		// this.toastr.setRootViewContainerRef(vRef);

		// sets an idle timeout of 5 seconds, for testing purposes.
		idle.setIdle(CONSTANTS.SESSION_TIMEOUT);
		// sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
		idle.setTimeout(0);
		// sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
		idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

		//idle.onIdleEnd.subscribe(() => (this.idleState = 'No longer idle.'));
		idle.onTimeout.subscribe(() => {
			this.idleState = 'Timed out!';
			this.timedOut = true;
		});
		idle.onIdleStart.subscribe(() => {
			this.idleState = "You've gone idle!";
			this.isLoggedIn = false;
			localStorage.clear();
			this.timedOut = true;
			this.router.navigate(['/home']).then(() => {
				this.toastr.error('Your session has been expired. Please log in to continue.');
			});
		});
	}

	reset() {
		this.idle.watch();
		this.idleState = 'Started.';
		this.timedOut = false;
	}

	checkDashLink() {
		this.role = localStorage.getItem('role');
		switch (this.role) {
			// case '2':
			// 	this.link = {
			// 		dashboard: 'researcher/dashboard',
			// 		profile: 'researcher/profile',
			// 	};
			// 	break;
			// case '3':
			// 	this.link = {
			// 		dashboard: 'provider/dashboard',
			// 		profile: 'provider/profile',
			// 	};
			// 	break;
			case '3':
				this.link = {
					dashboard: 'patient/dashboard',
					profile: 'patient/profile',
				};
				break;
			default:
				this.link = {};
				break;
		}
	}

	ngOnInit() {
		this.checkDashLink();
		this.router.events.subscribe(evt => {
			if (!(evt instanceof NavigationEnd)) {
				return;
			}

			// this.authService.check_login().subscribe(response => {
			// 	if (response.hasOwnProperty('status') && response['status'] == 'INVALID_TOKEN') {
			// 		console.log('Token Expired');
			// 		this.isLoggedIn = false;
			// 		localStorage.clear(); // forcefully logout and clear localstorage, if token not found

			// 		if (
			// 			!this.pathsWtLogin.some(path => {
			// 				return this.router.url.indexOf(path) === 0; // current path starts with this path string
			// 			})
			// 		) {
			// 			this.router.navigate(['/home']);
			// 		}
			// 	} else {
			// 		this.isLoggedIn = true;
			// 		this.reset();
			// 	}
			// });


			this.authService.checkLogin().subscribe(response => {
				console.log(response.length && !response[0]);
				//(response.length && !response[0]) ||
				if ( (response.length && !response[0]) || (response.hasOwnProperty("status") && response["status"] == "INVALID_TOKEN") ) {
					console.log("Token Expired");
					console.log(
						this.pathsWtLogin.some(path => {
							console.log(this.router.url.indexOf(path));
							return this.router.url.indexOf(path) === 0; // current path starts with this path string
						})
					);
					// this.isLoggedIn = false;
					localStorage.clear(); // forcefully logout and clear localstorage, if token not found
					this.isLoggedIn = false;
					this.isHeaderHidden = false;
					if (
						!this.pathsWtLogin.some(path => {
							return this.router.url.indexOf(path) === 0; // current path starts with this path string
						})
					) {
						this.router.navigate(["/home"]);
						// .then(() => {
						// 	this.toastr.error(
						// 		"Your session has been expired. Please log in to continue."
						// 	);
						// });
					}
				} else {
					this.isLoggedIn = true;
					this.isWeekStarted = response['is_week_started'];
					this.armAllocate = response['arm'];
					localStorage.setItem('arm',this.armAllocate);
					// console.log(this.isWeekStarted);
					this.reset();
				}
			});




			this.checkDashLink();
			this.maIsOpen = this.router.url.indexOf('/my-account') === 0;
			this.isHeaderHidden = ['/forgot-password', '/create-password', '/reset-password'].some(path => {
				return this.router.url.indexOf(path) === 0; // current path starts with this path string
			})
				? true
				: false;

			window.scrollTo(0, 0);
		});
	}
}
