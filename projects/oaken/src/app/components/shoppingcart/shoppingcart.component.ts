declare const bootstrap: any;
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { Item, ShoppingcartService } from '../../services/shoppingcart.service';
import { PromocodeService } from '../../services/promocode.service';
import { Toast, ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.scss'],
})
export class ShoppingcartComponent implements OnInit {
  @ViewChild('modal') modal: ElementRef | undefined;
  promocode: string = '';

  constructor(
    public shoppingcartService: ShoppingcartService,
    public promocodeService: PromocodeService,
    private toastService: ToastService,
  ) { }

  removeFromCart(item: Item) {
    this.shoppingcartService.removeFromCart(item);
  }

  setAmount(event: Event, item: Item): void {
    item.quantity = Number((event.target as HTMLInputElement).value);
    this.shoppingcartService.setItemAmount(item);
  }

  openPromocodeModal(): void {
    let modal = new bootstrap.Modal(this.modal!.nativeElement);
    modal.show();
  }

  setPromoCode(event: Event): void {
    this.promocode = (event.target as HTMLInputElement).value;
  }

  sendPromoCode(): void {
    let modal = bootstrap.Modal.getInstance(this.modal!.nativeElement);
    this.promocodeService.postData(this.promocode)
    .subscribe(
      (data) => {
        this.shoppingcartService.loadCart();
        this.toastService.addToast({
          title: 'Success',
          type: 'success',
          text: 'Your code has been added',
        } as Toast);
        modal.hide();
      },
      (error) => {
        this.toastService.addToast({
          title: 'Error',
          type: 'error',
          text: 'Your code is not valid',
        } as Toast);
        modal.hide();
      }
    );
  }

  ngOnInit(): void {
  }

}
