import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { NgxStripeModule } from 'ngx-stripe';
import { NgxPayPalModule } from 'ngx-paypal';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { AboutComponent } from './components/about/about.component';
import { ShoppingcartComponent } from './components/shoppingcart/shoppingcart.component';
import { ToastComponent } from './components/toast/toast.component';
import { AdressComponent } from './components/adress/adress.component';
import { BillComponent } from './components/bill/bill.component';
import { SummaryComponent } from './components/summary/summary.component';
import { ConsoleComponent } from './components/console/console.component';
import { ContactComponent } from './components/contact/contact.component';
import { ShippingComponent } from './components/shipping/shipping.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductsComponent,
    AboutComponent,
    ShoppingcartComponent,
    ToastComponent,
    AdressComponent,
    ProductDetailsComponent,
    BillComponent,
    SummaryComponent,
    ConsoleComponent,
    ContactComponent,
    ShippingComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxStripeModule.forRoot('pk_test_51H1xlaJnYuv8nFzxMoYtaUmKRoaDyFiXtT9yCTvpz7hsq3CrGURSbFxATOLL5hcZFWDUmqB6TAbv8uNwuFVcv0Ug00IlQUzzus'),
    NgxPayPalModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
