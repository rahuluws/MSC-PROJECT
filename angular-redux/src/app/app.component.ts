import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { BooksActions } from './actions/books.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: String = 'angular-redux';
  p = 1;
  @select('books') public books$: Observable<any> | undefined;
  @select(['books', 'active']) active$: any;
  activeBook: any;
  constructor(public actions: BooksActions) {
    actions.getBooks();
  }

  ngOnInit() {
    this.active$.subscribe((res: any) => {
      this.activeBook = res;
    });
  }

  save(f: any) {
    if (f.valid) {
      const newBook = Object.assign({}, this.activeBook, f.value);
      this.actions.save(newBook);
    } else {
      alert("Enter Valid Data");
    }


  }
}
