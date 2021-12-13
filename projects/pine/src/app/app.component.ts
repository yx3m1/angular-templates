import { Component, OnInit, HostBinding } from '@angular/core';

import { UserService } from './services/user.service';
import { ShoppingcartService } from './services/shoppingcart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @HostBinding('class') className = '';
  title = 'bamboo';

  constructor(
    private userService: UserService,
    private shoppingcartService: ShoppingcartService,
  ) { }

  toggleDarkMode(darkMode: boolean) {
    const darkClassName = 'darkmode';
    this.className = darkMode ? darkClassName : '';
  }

  ngOnInit(): void {
    this.userService.startSession()
    .subscribe(() => {
      this.shoppingcartService.loadCart();
    });
    this.userService.getDarkMode()
    .subscribe((value) => {
      this.userService.darkmode.next(value);
    });
    this.userService.darkmode
    .subscribe((value) => {
      this.toggleDarkMode(value);
    });
  }
}
