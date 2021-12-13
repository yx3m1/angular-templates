import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Subject, Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Product } from './product.service';
import { Promocode } from './promocode.service';
import { Message, ToastService } from './toast.service';

export interface Item {
  _id: string,
  product: Product,
  quantity: number,
}

@Injectable({
  providedIn: 'root'
})
export class ShoppingcartService {
  url = '/api/shoppingcart.json';
  items: Item[] = [];
  promocode: Promocode = {} as Promocode;
  subtotal: number = 0;
  shipping: number = 0;

  constructor(
    private http: HttpClient,
    private toastService: ToastService,
  ) { }

  addToCart(product: Product): void {
    this.postData(product)
    .subscribe((data: any) => {
      this.items = [...data.items];
      this.subtotal = data.subtotal;
      this.shipping = data.shipping.price;
      this.promocode = data.promocode;
      this.toastService.addMessage({
        title: 'Notice',
        type: 'success',
        text: product.name+' has been added to your cart',
      } as Message);
    });
  }

  setItemAmount(item: Item): void {
    this.setData(item)
    .subscribe((data: any ) => {
      this.subtotal = data.subtotal;
      this.shipping = data.shipping.price;
      this.promocode = data.promocode;
    });
  }

  removeFromCart(item: Item): void {
    this.removeData(item)
    .subscribe((data: any) => {
      this.items.splice(this.items.indexOf(item), 1);
      this.subtotal = data.subtotal;
      this.shipping = data.shipping.price;
      this.promocode = data.promocode;
    });
  }

  loadCart(): void {
    this.getData()
    .subscribe((data: any) => {
      this.items = [...data.items];
      this.subtotal = data.subtotal;
      this.shipping = data.shipping.price;
      this.promocode = data.promocode;
    });
  }

  clearCart(): void {
    //this.items = [];
  }

  getData(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.url}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  postData(product: Product): Observable<Item> {
    return this.http.post<Item>(`${this.url}`, product)
    .pipe(
      catchError(this.handleError)
    );
  }

  setData(item: Item): Observable<Item[]> {
    return this.http.put<Item[]>(`${this.url}/${item._id}`, item)
    .pipe(
      catchError(this.handleError)
    );
  }

  removeData(item: Item) {
    return this.http.delete(`${this.url}/${item._id}`)
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
