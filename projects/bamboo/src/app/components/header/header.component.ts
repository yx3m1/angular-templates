import { Component, OnInit } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { Item, ShoppingcartService } from '../../services/shoppingcart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  routerLinkActive = RouterLinkActive;

  constructor(
    public shoppingcartService: ShoppingcartService,
  ) { }

  ngOnInit(): void {
  }

}
