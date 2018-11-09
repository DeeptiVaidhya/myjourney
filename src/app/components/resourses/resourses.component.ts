import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsEventsService } from '../../service/google-analytics-events.service';

@Component({
	selector: 'app-resourses',
	templateUrl: './resourses.component.html',
	styleUrls: ['./resourses.component.css'],
})
export class ResoursesComponent implements OnInit {
	constructor(public gaes: GoogleAnalyticsEventsService) {}
	breadcrumb = [{ link: '/', title: 'Home' }, { title: 'Resources',class:'active' }];
	ngOnInit() {}
	ngAfterViewInit() {
		if (localStorage.getItem('role') == '4') {
			let $elems = document.querySelectorAll('.gaes-cls');
			for (let i = 0, l = $elems.length; i < l; i++) {
				(function($el, gaes) {
					$el.onclick = function() {
						let status = $el.parentElement.hasAttribute('aria-expanded')
							? $el.parentElement.getAttribute('aria-expanded') == 'false'
							: true;
						status &&
							gaes.emitEvent(
								'Resources',
								$el.getAttribute('data-ga-action') || 'Clicked',
								$el.getAttribute('data-ga-title') || $el.title,
								1,
								$el.getAttribute('data-ga-action') == 'Expand topic' ? 'topic' : 'button'
							);
					};
				})(<HTMLAnchorElement>$elems[i], this.gaes);
			}
		}
	}
}
