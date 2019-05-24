import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../service/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
	public isCollapsed: boolean = true;
	@Input() isLoggedIn;
	@Input() isWeekStart;
	@Input() maIsOpen;
	@Input() link;
	@Input('role') role;
	maClicked:boolean =false;
	data:any;
	constructor(private router:Router,private authService: AuthService,public toastr: ToastrService) { }
	toggleDropdown(): void {
		this.maClicked = !this.maClicked;
	}

	ngOnInit() {
	}

	logout() {
		this.authService.logout().subscribe(
			result => {
				this.data = result;
				if (this.data.status === 'success') {
					localStorage.removeItem('token');
					localStorage.clear();
					this.router.navigate(['/home']).then(() => {
						this.toastr.success(this.data.msg);
					});
				}
			},
			err => {
				console.log(err);
			}
		);
	}

	scroll(el) {
		// if not home page, then first to to Home then scroll down
		if (this.router.url !== '/home') {
			this.router.navigate(['/home']).then(()=>{
				document.getElementById(el).scrollIntoView({behavior:"smooth"});
			});
		} else {
			document.getElementById(el).scrollIntoView({behavior:"smooth"});
		}
	}
}
