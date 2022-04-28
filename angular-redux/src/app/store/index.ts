import { combineReducers } from 'redux';

import { Books } from '../model/book';
import { BooksReducer } from './books.reducer';

export class IAppState {
  books: Books | undefined;
};

export const rootReducer = combineReducers<IAppState>({
  books: BooksReducer,
});


