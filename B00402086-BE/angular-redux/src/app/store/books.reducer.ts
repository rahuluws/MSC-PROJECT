import { BooksActions } from "../actions/books.actions";
import { Books } from "../model/book";


const INITIAL_STATE: Books = {
    list: [],
    active: {}
};

export function BooksReducer(state: Books = INITIAL_STATE, action: any): any {
    let index, active, list;

    switch (action.type) {
        case BooksActions.BOOKS_GET:
            return Object.assign({}, state, { list: action.payload.list });

        case BooksActions.BOOKS_GET_ACTIVE:
            return state.active;

        case BooksActions.BOOKS_DELETE:
            list = state.list
                .filter(({ _id }) => _id !== action.payload._id);
            return Object.assign({}, state, { list });

        case BooksActions.BOOKS_ADD:
            state.list.push(action.payload.book);
            return state;

        case BooksActions.BOOKS_UPDATE:
            list = [...state.list];
            index = list.findIndex(({ _id }) => _id === action.payload.book._id);
            list[index] = action.payload.book;
            return Object.assign({}, state, { list });

        case BooksActions.BOOKS_SET_ACTIVE:
            active = state.list.find(({ _id }) => _id === action.payload._id);
            return Object.assign({}, state, { active });


        case BooksActions.BOOKS_RESET_ACTIVE:
            return Object.assign({}, state, { active: {} });

        default:
            return state;
    }
}

