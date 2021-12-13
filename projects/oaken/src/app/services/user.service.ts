import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Session {
  cookie: object,
  darkmode: boolean,
  user: string,
}

export interface User {
  session: string,
  firstname: string,
  lastname: string,
  email: string,
  street: string,
  zip: string,
  town: string,
  country: string,
  _id: string,
  __v: number,
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  url = '/api/users.json';
  session: Session = {} as Session;
  darkmode: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
  ) { }

  getData(): Observable<User> {
    return this.http.get<User>(`${this.url}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  setData(user: User): Observable<User> {
    return this.http.put<User>(`${this.url}`, user)
    .pipe(
      catchError(this.handleError)
    );
  }

  startSession(): Observable<Session> {
    return this.http.get<Session>(`${this.url}/session`)
    .pipe(
      catchError(this.handleError)
    );
  }

  getDarkMode(): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}/darkmode`)
    .pipe(
      catchError(this.handleError)
    );
  }

  toggleDarkMode(darkmode: boolean) {
    this.darkmode.next(darkmode);
    return this.http.put(`${this.url}/darkmode`, {
      darkmode: darkmode
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
