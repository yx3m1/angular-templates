import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ShoppingcartService } from '../../services/shoppingcart.service'
import { Product, ProductService } from '../../services/product.service'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  form = new FormGroup({
    search: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ])
  });

  constructor(
    private shoppingcartService: ShoppingcartService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const term: string = params.search || '';
      this.form.patchValue({
        search: term,
      });
      this.productService.getData(term)
      .subscribe((products) => {
        this.products = products;
      });
    });
  }

  onSearch() {
    this.router.navigate(['/products'], {
      queryParams: this.form.value,
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

}
