import { Injectable } from '@angular/core';
import { IAppState } from '../store/index';
import { NgRedux } from '@angular-redux/store';
import { Book } from '../model/book';
import { NgxSpinnerService } from "ngx-spinner";
import { BookService } from 'src/services/book.service';

@Injectable()
export class BooksActions {
  static BOOKS_GET = 'BOOKS_GET';
  static BOOKS_ADD = 'BOOKS_ADD';
  static BOOKS_UPDATE = 'BOOKS_UPDATE';
  static BOOKS_DELETE = 'BOOKS_DELETE';
  static BOOKS_GET_ACTIVE = 'BOOKS_GET_ACTIVE';
  static BOOKS_SET_ACTIVE = 'BOOKS_SET_ACTIVE';
  static BOOKS_RESET_ACTIVE = 'BOOKS_RESET_ACTIVE';

  API_URL = 'http://localhost:3000';

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private spinner: NgxSpinnerService,
    private bookService:BookService
  ) {
  }

  getBooks() {
    this.spinner.show();
    this.bookService.getBooks()
      .subscribe((list:any) => {
        // populate books state (dispatch action)
        this.ngRedux.dispatch({
          type: BooksActions.BOOKS_GET,
          payload: {
            list
          }
        });
        this.spinner.hide();
        // Set the first book as active (dispatch action)
        this.setActiveBook(list[0]._id);
      });
  }

  save(book: Book) {
    if (book._id) {
      this.update(book);
    } else {
      this.add(book);
    }
  }

  add(book: Book) {
    this.bookService.saveBooks(book)
      .subscribe((res:any) => {
        // add new book
        this.ngRedux.dispatch({
          type: BooksActions.BOOKS_ADD,
          payload: { book: res }
        });

        // select last added book
        this.setActiveBook(res._id);
      });
  }

  update(book: Book) {
    this.bookService.updateBooks(book)
      .subscribe((res:any) => {
        // update book
        this.ngRedux.dispatch({
          type: BooksActions.BOOKS_UPDATE,
          payload: { book: res }
        });

        // update active book
        this.setActiveBook(book._id);
      });
  }

  deleteBook(_id: any) {
    this.bookService.deleteBook(_id)
      .subscribe((res) => {
        this.ngRedux.dispatch({
          type: BooksActions.BOOKS_DELETE,
          payload: { _id }
        });
        this.resetActive();
      });
  }

  setActiveBook(_id:any): void {
    this.ngRedux.dispatch({
      type: BooksActions.BOOKS_SET_ACTIVE,
      payload: { _id }
    });
  }

  resetActive(): void {
    this.ngRedux.dispatch({
      type: BooksActions.BOOKS_RESET_ACTIVE,
      payload: null
    });
  }
}
