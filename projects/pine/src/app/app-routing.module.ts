import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { AboutComponent } from './components/about/about.component';
import { ShippingComponent } from './components/shipping/shipping.component';
import { ContactComponent } from './components/contact/contact.component';
import { ShoppingcartComponent } from './components/shoppingcart/shoppingcart.component';
import { AdressComponent } from './components/adress/adress.component';
import { SummaryComponent } from './components/summary/summary.component';
import { BillComponent } from './components/bill/bill.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'about', component: AboutComponent},
  {path: 'shipping', component: ShippingComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'shoppingcart', component: ShoppingcartComponent},
  {path: 'adress', component: AdressComponent},
  {path: 'summary', component: SummaryComponent},
  {path: 'bill/:id', component: BillComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
