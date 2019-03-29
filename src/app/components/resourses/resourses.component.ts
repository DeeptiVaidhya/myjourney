import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-resourses',
	templateUrl: './resourses.component.html',
	styleUrls: ['./resourses.component.css'],
})
export class ResoursesComponent implements OnInit {
	constructor() {}
	breadcrumb = [{ link: '/', title: 'Home' }, { title: 'Resources',class:'active' }];
	ngOnInit() {}
}
