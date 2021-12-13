import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpParams } from '@angular/common/http';

import { ShoppingcartService } from '../../services/shoppingcart.service';
import { Product, ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private shoppingcartService: ShoppingcartService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  addToCart(event: Event, product: Product) {
    let element = (event.target as HTMLInputElement);
    element.setAttribute('disabled', 'true');
    this.shoppingcartService.addToCart(product);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      var term: string = params.search || '';
      term = term.trim();
      let options =  new HttpParams().set('search', term);
      this.productService.getData(options)
      .subscribe((products) => this.products = products);
    });
  }

}
