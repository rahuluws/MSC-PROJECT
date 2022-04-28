import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Book } from 'src/app/model/book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-rxjs';
  books: Book[] = [];
  p = 1;
  activeBook: Book | undefined;
  ngOnInit(): void {
    this.getMyBooks();
    this.getActiveBook();
  }

  constructor(private router: Router, private bookService: BookService, private spinner: NgxSpinnerService) { }

  getMyBooks() {
    this.spinner.show();
    this.bookService.getBooksList().subscribe(res => {
      if (res && res.length) {
        this.books = res;
        this.spinner.hide();
      }
    });
  }

  getActiveBook() {
    this.bookService.getActiveBook().subscribe(res => {
      this.activeBook = res;
    });
  }

  setActiveBook(book: any) {
    this.bookService.setActiveBook(book);
  }

  save(f: any) {
    if (f.valid) {
      const newBook = Object.assign({}, this.activeBook, f.value);
      if (newBook._id) {
        this.bookService.updateBooks(newBook);
      } else {
        this.bookService.saveBooks(newBook);
      }
    } else {
      alert("Enter Valid Data");
    }
  }

  deleteBook(book: any) {
    this.bookService.deleteBook(book._id);
  }

  resetActive() {
    this.activeBook = undefined;
  }
}
