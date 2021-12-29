import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { CarouselComponent } from './Components/carousel/carousel.component';
import { CategoryComponent } from './Components/category/category.component';
import { TrendingComponent } from './Components/trending/trending.component';
import { Section1Component } from './Components/section1/section1.component';
import { Section2Component } from './Components/section2/section2.component';
import { Section3Component } from './Components/section3/section3.component';
import { Section4Component } from './Components/section4/section4.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AddToCartComponent } from './Components/add-to-cart/add-to-cart.component';
import { HomeComponent } from './Components/home/home.component';

import { HttpClientModule } from '@angular/common/http';
import { AllProductsComponent } from './Components/all-products/all-products.component';



import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';

import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { AdminDashboardComponent } from './Admin/AdminDashboard/admin-dashboard/admin-dashboard.component';
import { ProductComponent } from './Admin/AdminDashboard/product/product/product.component';
import { ProductListComponent } from './Admin/AdminDashboard/productList/product-list/product-list.component';
import { ProductDialogComponent } from './Admin/AdminDashboard/productDialog/product-dialog/product-dialog.component';
import { LoginModule } from './Login/login.module';
import { AdminLoginComponent } from './Admin/AdminLogin/admin-login/admin-login.component';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    CarouselComponent,
    CategoryComponent,
    TrendingComponent,
    Section1Component,
    Section2Component,
    Section3Component,
    Section4Component,
    AddToCartComponent,
    HomeComponent,
    AllProductsComponent,
    AdminDashboardComponent,
    ProductComponent,
    ProductListComponent,
    ProductDialogComponent,
    AdminLoginComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CarouselModule ,
    HttpClientModule,
    
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    MaterialModule,
    LoginModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
