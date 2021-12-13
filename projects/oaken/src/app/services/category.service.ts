import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Image {
  _id: string,
  title: string,
  src: string,
}

export interface Category {
  _id: string,
  name: string,
	images: Image[],
	order: number,
	desc: string,
	quantity: number,
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = '/api/categories.json';

  constructor(
    private http: HttpClient,
  ) { }

  getData(options: any): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.url}`, {
      params: options
    }).pipe(
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
