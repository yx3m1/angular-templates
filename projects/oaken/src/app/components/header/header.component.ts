import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { Router, ActivatedRoute, RouterLinkActive } from '@angular/router';
import { Item, ShoppingcartService } from '../../services/shoppingcart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('mainNav') nav: ElementRef | undefined;
  routerLinkActive = RouterLinkActive;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public shoppingcartService: ShoppingcartService,
  ) { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.activatedRoute.snapshot.url.length > 0) return;
    if (window.scrollY === 0) {
      this.nav!.nativeElement.classList.remove('navbar-shrink');
    } else {
      this.nav!.nativeElement.classList.add('navbar-shrink');
    }
  }

  ngOnInit(): void {
  }

}
