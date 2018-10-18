import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {
  map,
  withLatestFrom,
  tap,
  switchMap,
  delay,
  debounce,
  debounceTime,
  throttleTime,
} from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';

import {
  GameActions,
  StartGame,
  CreateDeck,
  SetCards,
  FlipCard,
  CompleteCards,
  FlipBackCards,
  FinishGame,
  SetTriesCounter,
} from './actions';
import { getImages, getCards, getTries } from './reducer';

export interface Card {
  imageUrl: string;
  found: boolean;
  flipped: boolean;
}

@Injectable()
export class GameEffects {
  @Effect()
  startGame$ = this.actions$.pipe(
    ofType<StartGame>(GameActions.START_GAME),
    map(action => action.payload.deckSize),
    map(deckSize => new CreateDeck({ deckSize }))
  );

  @Effect()
  createDeck$ = this.actions$.pipe(
    ofType<CreateDeck>(GameActions.CREATE_DECK),
    map(action => action.payload.deckSize),
    withLatestFrom(this.store.pipe(select(getImages))),
    map(([deckSize, images]) => {
      const cards: Card[] = images.slice(0, deckSize).map(imageUrl => ({
        imageUrl,
        found: false,
        flipped: false,
      }));
      return new SetCards({ cards: [...cards, ...cards] });
    }),
    tap(() => this.router.navigate(['/game']))
  );

  @Effect()
  checkCompleteCards$ = this.actions$.pipe(
    ofType<FlipCard>(GameActions.FLIP_CARD),
    map(action => action.payload.index),
    withLatestFrom(this.store.pipe(select(getCards))),
    throttleTime(200),
    delay(200),
    switchMap(([_, cards]) => {
      const flippedCards = cards.filter(card => card.flipped);
      if (flippedCards.length === 2) {
        if (flippedCards[0].imageUrl === flippedCards[1].imageUrl) {
          return [
            new CompleteCards({
              completed: true,
              imageUrl: flippedCards[0].imageUrl,
            }),
            new SetTriesCounter(),
          ];
        }
        return [new CompleteCards({ completed: false }), new SetTriesCounter()];
      }
      return [];
    })
  );

  @Effect()
  checkFinish$ = this.actions$.pipe(
    ofType<CompleteCards>(GameActions.COMPLETE_CARDS),
    withLatestFrom(
      this.store.pipe(select(getCards)),
      this.store.pipe(select(getTries))
    ),
    switchMap(([_, cards, tries]) => {
      const cardsLeft = cards.filter(card => !card.found);
      if (cardsLeft.length === 0) {
        return [new FinishGame({ tries })];
      }
      return [];
    })
  );

  @Effect({ dispatch: false })
  navigateOnFinish$ = this.actions$.pipe(
    ofType<FinishGame>(GameActions.FINISH_GAME),
    tap(() => this.router.navigate(['']))
  );

  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private router: Router
  ) {}
}
