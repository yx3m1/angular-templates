import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

import { User, UserService } from '../../services/user.service'
import { Toast, ToastService } from '../../services/toast.service';
import { Product, ProductService } from '../../services/product.service';
import { ShoppingcartService } from '../../services/shoppingcart.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ])
  });

  constructor(
    private router: Router,
    private userService: UserService,
    private toastService: ToastService,
    private productService: ProductService,
    private shoppingcartService: ShoppingcartService,
  ) { }

  subscribeForNewsletter(event: Event) {
    let email = (event.target as HTMLInputElement).value;

    this.userService.setData(this.form.value)
    .subscribe((user) => {});
  }

  onSubmit() {
    let data = this.form.value;
    data.newsletter = true;
    this.userService.setData(data)
    .subscribe((user) => {
      this.toastService.addToast({
        title: 'Success',
        type: 'success',
        text: 'You are now subscribed to the newsletter',
      } as Toast);
    });
  }

  searchForTag(tag: string) {
    this.router.navigate(['/products'], {
      queryParams: {
        search: tag,
      },
    });
  }

  addToCart(event: Event, product: Product) {
    let element = (event.target as HTMLInputElement);
    element.setAttribute('disabled', 'true');
    this.shoppingcartService.addToCart(product);
  }

  ngOnInit(): void {
    this.userService.getData()
    .subscribe((user) => {
      this.form.patchValue(user);
    });
    let options =  new HttpParams().set('limit', 6);
    this.productService.getData(options)
    .subscribe((products) => this.products = products);
  }

}
