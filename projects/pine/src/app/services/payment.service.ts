import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router} from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { StripeService } from 'ngx-stripe';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

import { ShoppingcartService } from './shoppingcart.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  items = []; // Product
  public payPalConfig ? : IPayPalConfig;

  constructor(
    private http: HttpClient,
    private router: Router,
    private stripeService: StripeService,
    private shoppingcartService: ShoppingcartService,
  ) {}

  payWithStripe() {
    // Check the server.js tab to see an example implementation
    this.http.post('/api/stripe.json', {
      items: this.items,
    }).pipe(
      switchMap((session: any) => {
        return this.stripeService.redirectToCheckout({ sessionId: session.id })
      })
    )
    .subscribe(result => {
      // If `redirectToCheckout` fails due to a browser or network
      // error, you should display the localized error message to your
      // customer using `error.message`.
      if (result.error) {
        alert(result.error.message);
      }
    });
  }

  initPaypal() {
      return this.payPalConfig = {
          currency: 'EUR',
          clientId: 'sb',
          // for creating orders (transactions) on server see
          // https://developer.paypal.com/docs/checkout/reference/server-integration/set-up-transaction/
          createOrderOnServer: (data) => fetch('/api/paypal.json/create-paypal-transaction')
            .then((res) => res.json())
            .then((order) => order.orderID),
          onClientAuthorization: (data) => {
              this.http.post('/api/paypal.json/success', data)
              .subscribe((order: any) => {
                const orderId = order ? order._id : null;
                this.router.navigate(['/bill', orderId])
                .then(() => { //ugly paypal
                  window.location.reload();
                });
              });
          },
      };
  }

}
