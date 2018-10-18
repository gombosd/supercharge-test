import { Card } from './effects';

export enum GameActions {
  START_GAME = 'start game',
  CREATE_DECK = 'create deck',
  SET_CARDS = 'set cards',
  FLIP_CARD = 'flip card',
  COMPLETE_CARDS = 'complete cards',
  FLIP_BACK_CARDS = 'flip back cards',
  FINISH_GAME = 'finish game',
  SET_COUNTER = 'set counter',
  RESTART = 'restart',
}

export class StartGame {
  readonly type = GameActions.START_GAME;
  constructor(public payload: { deckSize: number }) {}
}

export class CreateDeck {
  readonly type = GameActions.CREATE_DECK;
  constructor(public payload: { deckSize: number }) {}
}

export class SetCards {
  readonly type = GameActions.SET_CARDS;
  constructor(public payload: { cards: Card[] }) {}
}

export class FlipCard {
  readonly type = GameActions.FLIP_CARD;
  constructor(public payload: { index: number }) {}
}

export class CompleteCards {
  readonly type = GameActions.COMPLETE_CARDS;
  constructor(public payload: { completed: boolean; imageUrl?: string }) {}
}

export class FlipBackCards {
  readonly type = GameActions.FLIP_BACK_CARDS;
  constructor() {}
}

export class FinishGame {
  readonly type = GameActions.FINISH_GAME;
  constructor(public payload: { tries: number }) {}
}

export class SetTriesCounter {
  readonly type = GameActions.SET_COUNTER;
  constructor() {}
}

export type GameAction =
  | StartGame
  | CreateDeck
  | SetCards
  | FlipCard
  | CompleteCards
  | FlipBackCards
  | FinishGame
  | SetTriesCounter;
