declare const bootstrap: any;
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { ShoppingcartService } from '../../services/shoppingcart.service'
import { Product, Image, ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  @ViewChild('modal') modal: ElementRef | undefined;
  product: Product | undefined;
  image: Image | undefined;
  cursor = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingcartService: ShoppingcartService,
  ) { }

  searchForTag(tag: any) {
    this.router.navigate(['/products'], {
      queryParams: {
        search: tag._id,
      },
    });
  }

  addToCart(event: Event) {
    let element = (event.target as HTMLInputElement);
    element.setAttribute('disabled', 'true');
    this.shoppingcartService.addToCart(this.product!);
  }

  openImageModal(event: Event): void {
    let src = (event.target as HTMLElement).getAttribute('src');
    let modal = new bootstrap.Modal(this.modal!.nativeElement);
    modal._element.querySelector('img').setAttribute('src', src);
    modal.show();
  }

  nextImage() {
    this.cursor++;
    if (this.cursor >= this.product!.images.length) this.cursor = 0;
    this.image = this.product!.images[this.cursor];
  }

  lastImage() {
    this.cursor--;
    if (this.cursor < 0) this.cursor = this.product!.images.length-1;
    this.image = this.product!.images[this.cursor];
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const productId: string = routeParams.get('id') || '';

    this.productService.getProduct(productId)
    .subscribe((data) => {
      this.product = { ...data };
      this.image = this.product.images[this.cursor];
    });
  }

}
