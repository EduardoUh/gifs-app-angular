import { Component, ElementRef, ViewChild } from '@angular/core';

import { GifsService } from './../../services/gifs.service';


@Component({
	selector: 'gifs-search-box',
	templateUrl: './search-box.component.html'
})
export class SearchBoxComponent {
	/*
		* ViewChildren decorator returns all the elements with the specified selector
		* ViewChild returns the first element with the specified selector
	*/
	@ViewChild('txtTagInput')
	public tagInput!: ElementRef<HTMLInputElement>;

	constructor(private _gifsService: GifsService) { }

	public searchTag(): void {
		const newTag = this.tagInput.nativeElement.value;

		this._gifsService.searchTag(newTag);

		this.tagInput.nativeElement.value = '';
	}
}
