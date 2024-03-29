import { Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
	selector: 'shared-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
	constructor(private _gifsService: GifsService) { }

	public get tagsHistory(): string[] {
		return this._gifsService.tagsHistory;
	}

	public searchTag(tag: string): void {
		this._gifsService.searchTag(tag);
	}
}
