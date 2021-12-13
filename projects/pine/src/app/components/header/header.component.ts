declare const bootstrap: any;

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLinkActive } from '@angular/router';

import { Item, ShoppingcartService } from '../../services/shoppingcart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('modal') modal: ElementRef | undefined;
  routerLinkActive = RouterLinkActive;

  constructor(
    private router: Router,
    public shoppingcartService: ShoppingcartService,
  ) {}

  toggleNavModal(): void {
    if (this.modal!.nativeElement.classList.contains('show') == true) {
      let modal = bootstrap.Modal.getInstance(this.modal!.nativeElement);
      modal.hide();
    } else {
      let modal = new bootstrap.Modal(this.modal!.nativeElement);
      modal.show();
    }
  }

  ngOnInit(): void {
    this.router.events.subscribe((val) => {
      let modal = bootstrap.Modal.getInstance(this.modal!.nativeElement);
      if (modal) modal.hide();
    });
  }

}
