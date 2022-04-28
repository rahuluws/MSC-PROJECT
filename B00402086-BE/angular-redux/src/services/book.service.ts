import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private baseUrl = 'http://localhost:3000';
  constructor(private httpService: HttpClient) {
  
  }

  getBooks() {
    return this.httpService.get<any[]>(`${this.baseUrl}/books`);
  }

  deleteBook(_id: any) {
    return this.httpService.delete<any[]>(`${this.baseUrl}/books/${_id}`);
  }

  saveBooks(data: any) {
    return this.httpService.post<any[]>(`${this.baseUrl}/books`, data);
  }

  updateBooks(data: any) {
   return this.httpService.put<any[]>(`${this.baseUrl}/books/${data._id}`, data);
  }

}
