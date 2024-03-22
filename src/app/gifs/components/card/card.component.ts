import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
	selector: 'gifs-card',
	templateUrl: './card.component.html'
})
// OnInit is part of the life time of a component, so we can add some checks or validations to the class when it is mounted
export class CardComponent implements OnInit {
	@Input()
	public gif!: Gif;

	ngOnInit(): void {
		if (!this.gif) throw new Error('Gif property is required');
	}
}
