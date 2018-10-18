import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { getCards, getTries, getBest } from '../store/reducer';
import { FlipCard, RestartGame } from '../store/actions';

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css'],
})
export class GamePageComponent implements OnInit {
  cards$ = this.store.pipe(select(getCards));
  tries$ = this.store.pipe(select(getTries));
  best$ = this.store.pipe(select(getBest));

  constructor(private store: Store<any>) {}

  ngOnInit() {}

  onRestart() {
    this.store.dispatch(new RestartGame());
  }

  onClick(index) {
    this.store.dispatch(new FlipCard({ index }));
  }
}
