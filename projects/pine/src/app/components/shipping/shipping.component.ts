import { Component, OnInit } from '@angular/core';

import { Shipping, ShippingService } from '../../services/shipping.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.scss']
})
export class ShippingComponent implements OnInit {
  shippings: Shipping[] = [];

  constructor(
    private shippingService: ShippingService,
  ) { }

  ngOnInit(): void {
    this.shippingService.getData()
    .subscribe((shippings) => this.shippings = shippings);
  }

}
