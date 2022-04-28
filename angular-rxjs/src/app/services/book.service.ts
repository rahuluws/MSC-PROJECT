import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  books: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  currrentBook: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  
  private baseUrl = 'http://localhost:3000';
  constructor(private httpService: HttpClient) {
    this.getBooks()
  }

  setBooks(data: any) {
    this.books.next(data);
    this.setActiveBook(data[0]);
  }

  getBooks() {
    this.httpService.get<any[]>(`${this.baseUrl}/books`).subscribe(data => {
      this.books.next(data);
      this.setActiveBook(data[0]);
    });
  }

  deleteBook(_id:any) {
    this.httpService.delete<any[]>(`${this.baseUrl}/books/${_id}`).subscribe(data => {
      this.getBooks();
    });

  }

  saveBooks(data: any) {
    this.httpService.post<any[]>(`${this.baseUrl}/books`, data).subscribe(data => {
      this.getBooks();
    });
  }

  updateBooks(data: any) {
    this.httpService.put<any[]>(`${this.baseUrl}/books/${data._id}`, data).subscribe(data => {
      this.getBooks();
    });
  }

  getBooksList(): Observable<any> {
    return this.books.asObservable();
  }

  booksUnSubscribe() {
    this.books.unsubscribe();
  }

  setActiveBook(data: any) {
    this.currrentBook.next(data);
  }

  getActiveBook(): Observable<any> {
    return this.currrentBook.asObservable();
  }

  activeBookUnSubscribe() {
    this.currrentBook.unsubscribe();
  }
}
