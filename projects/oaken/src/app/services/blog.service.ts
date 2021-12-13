import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Blog {
  _id: number,
  title: string,
  author: string,
  text: string,
  date: Date,
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  url = '/api/news.json';

  constructor(
    private http: HttpClient,
  ) { }

  getData(limit: number) {
    const options = limit ?
     { params: new HttpParams().set('limit', limit) } : {};
    return this.http.get<Blog[]>(`${this.url}`, options)
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }

}
