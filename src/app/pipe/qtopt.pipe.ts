import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'qtopt'
})
export class QtoptPipe implements PipeTransform {

	transform(value: any, args?: any): any {
		let query_varible = value.split('&');
		let arr = [];
		for (let i = 0; i < query_varible.length; i++) {
			let pair = query_varible[i].split('=');
			arr.push({
				id: pair[0],
				name: pair[1],
			});
		}
		return arr;
	}

}
