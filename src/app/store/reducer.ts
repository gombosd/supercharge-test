import { createSelector } from '@ngrx/store';
import { GameAction, GameActions } from './actions';
import { Card } from './effects';

export interface ICardMatch {
  cards: Card[];
  images: string[];
  currentTries: number;
  best: number;
}

const LATEST_STATE = 'latest-state';

const getLocalState = () =>
  localStorage && JSON.parse(localStorage.getItem(LATEST_STATE));

const initialState = {
  cards: [],
  images: [
    '/assets/images/angular.png',
    '/assets/images/d3.png',
    '/assets/images/postcss.png',
    '/assets/images/jenkins.png',
    '/assets/images/react.png',
    '/assets/images/redux.png',
    '/assets/images/sass.png',
    '/assets/images/supercharge.png',
    '/assets/images/ts.png',
    '/assets/images/webpack.png',
  ],
  currentTries: 0,
  best: 0,
};

const setLocalStorage = (state: ICardMatch) => {
  if (localStorage) {
    localStorage.setItem(LATEST_STATE, JSON.stringify(state));
  }
};

const clearLocalStorage = () => {
  const best = JSON.parse(localStorage.getItem(LATEST_STATE)).best;
  localStorage.setItem(LATEST_STATE, JSON.stringify({ ...initialState, best }));
};

export function cardMatchReducer(
  state: ICardMatch = getLocalState() || initialState,
  action: GameAction
) {
  switch (action.type) {
    case GameActions.SET_CARDS: {
      const cards = action.payload.cards;
      const localState = getLocalState();
      return {
        ...initialState,
        cards,
        tries: 0,
        best: (localState && localState.best) || 0,
      };
    }
    case GameActions.FLIP_CARD: {
      const index = action.payload.index;
      state.cards[index] = { ...state.cards[index], flipped: true };
      setLocalStorage(state);
      return { ...state };
    }

    case GameActions.COMPLETE_CARDS: {
      const { completed } = action.payload;
      const cards = state.cards.map(card => {
        if (card.imageUrl === action.payload.imageUrl) {
          return { ...card, found: completed, flipped: false };
        }
        if (!card.found) {
          return { ...card, found: false, flipped: false };
        }
        return card;
      });
      const newState = { ...state, cards };
      setLocalStorage(newState);
      return newState;
    }
    case GameActions.SET_COUNTER: {
      return { ...state, currentTries: state.currentTries + 1 };
    }
    case GameActions.FINISH_GAME: {
      const newBest =
        action.payload.tries > state.best && state.best > 0
          ? state.best
          : action.payload.tries;
      const newState = { ...state, best: newBest + 1 };
      setLocalStorage(newState);
      return newState;
    }
    default:
      return state;
  }
}

export const gameState = state => state.cardMatching as ICardMatch;

export const getImages = createSelector(gameState, state => state.images);
export const getCards = createSelector(gameState, state => state.cards);
export const getTries = createSelector(gameState, state => state.currentTries);
export const getBest = createSelector(gameState, state => state.best);
