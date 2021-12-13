declare const bootstrap: any;
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

import { Item, ShoppingcartService } from '../../services/shoppingcart.service';
import { PaymentService } from '../../services/payment.service';
import { User, UserService } from '../../services/user.service';
import { Message, ToastService } from '../../services/toast.service';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  public payPalConfig ? : IPayPalConfig;
  public user: User = {} as User;
  @ViewChild('modal') modal: ElementRef | undefined;
  @ViewChild('loader') loader: ElementRef | undefined;

  constructor(
    public shoppingcartService: ShoppingcartService,
    public paymentService: PaymentService,
    public userService: UserService,
    private toastService: ToastService,
  ) { }

  onSubmit() {
    if (this.shoppingcartService.subtotal < 1) {
      return this.toastService.addMessage({
        title: 'Notice',
        type: 'error',
        text: 'The total value of you shoppingcart is zero',
      } as Message);
    }
    let modal = new bootstrap.Modal(this.modal!.nativeElement);
    modal.show();
  }

  payWithStripe(): void {
    let payment = bootstrap.Modal.getInstance(this.modal!.nativeElement);
    let loader = new bootstrap.Modal(this.loader!.nativeElement);
    payment.hide();
    loader.show();
    this.paymentService.payWithStripe();
  }

  ngOnInit(): void {
    this.payPalConfig = this.paymentService.initPaypal();
    this.userService.getData()
    .subscribe(user => this.user = user);
  }

}
