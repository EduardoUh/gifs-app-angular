import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Gif, SearchResponse } from './../interfaces/gifs.interfaces';

const GIPHY_API_KEY = 'k4k8YqVgIok0UYY4jw44xjHYIRZywhdb';
const SERVICE_URL = 'https://api.giphy.com/v1/gifs';

/*
	* example of how the endpoint should look like:
		https://api.giphy.com/v1/gifs/search?api_key=k4k8YqVgIok0UYY4jw44xjHYIRZywhdb&q=ronaldo&limit=10
*/

@Injectable({ providedIn: 'root' })
export class GifsService {
	private _tagsHistory: string[] = [];
	private _gifList: Gif[] = [];

	constructor(private _http: HttpClient) {
		this.loadLocalStorage();
	}

	public get tagsHistory(): string[] {
		return [...this._tagsHistory];
	}

	public get gifList(): Gif[] {
		return [...this._gifList];
	}

	private saveToLocalStorage(): void {
		localStorage.setItem('tagsHistory', JSON.stringify(this._tagsHistory));
	}

	private loadLocalStorage(): void {
		if (!localStorage.getItem('tagsHistory')) return;

		this._tagsHistory = JSON.parse(localStorage.getItem('tagsHistory')!);

		this._tagsHistory.length > 0 && this.searchTag(this._tagsHistory[0]);
	}

	private organizeHistory(newTag: string) {
		newTag = newTag.trim().toLowerCase();

		if (this._tagsHistory.includes(newTag)) {
			this._tagsHistory = this._tagsHistory.filter(tag => tag !== newTag);
		}

		this._tagsHistory.unshift(newTag);
		this._tagsHistory = this._tagsHistory.splice(0, 10);

		this.saveToLocalStorage();
	}

	public searchTag(tag: string): void {
		if (tag.trim() === '') {
			return;
		}

		this.organizeHistory(tag);

		const params = new HttpParams()
			.set('api_key', GIPHY_API_KEY)
			.set('q', this._tagsHistory[0])
			.set('limit', 10);

		this._http.get<SearchResponse>(`${SERVICE_URL}/search?`, { params })
			.subscribe(resp => {
				this._gifList = resp.data;
			});
	}
}
