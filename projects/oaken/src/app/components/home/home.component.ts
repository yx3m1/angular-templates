import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

import { User, UserService } from '../../services/user.service'
import { Toast, ToastService } from '../../services/toast.service';
import { Category, CategoryService } from '../../services/category.service';
import { ShoppingcartService } from '../../services/shoppingcart.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories: Category[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private toastService: ToastService,
    private categoryService: CategoryService,
    public shoppingcartService: ShoppingcartService,
  ) { }

  searchForCategory(category: any) {
    this.router.navigate(['/products'], {
      queryParams: {
        search: category._id,
      },
    });
  }

  ngOnInit(): void {
    let options =  new HttpParams().set('limit', 6);
    this.categoryService.getData(options)
    .subscribe((categories) => this.categories = categories);
  }

}
