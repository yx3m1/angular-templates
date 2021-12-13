import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,  HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Order {
  _id: string,
  user: any,
	items: any,
  shipping: any,
	promocode: any,
  subtotal: number,
	payment: string,
	status: string,
	paid: boolean,
	date: Date,
}

@Injectable({
  providedIn: 'root'
})
export class BillService {
  url = '/api/orders.json';

  constructor(
    private http: HttpClient,
  ) { }

  getData(id: string) {
    const options = id ?
     { params: new HttpParams().set('id', id) } : {};
    return this.http.get<Order>(`${this.url}`, options)
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
