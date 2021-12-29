import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './Admin/AdminDashboard/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './Admin/AdminLogin/admin-login/admin-login.component';
import { AddToCartComponent } from './Components/add-to-cart/add-to-cart.component';
import { AllProductsComponent } from './Components/all-products/all-products.component';
import { HomeComponent } from './Components/home/home.component';
import { ForgotPasswordComponent } from './Login/forgot-password/forgot-password.component';
import { LoginFormComponent } from './Login/loginForm/login-form/login-form.component';
import { RegisterComponent } from './Login/register/register/register.component';
import { VerifyEmailComponent } from './Login/verify-email/verify-email.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { RoleGuard } from './shared/guard/role.guard';

const routes: Routes = [
  {
    path:'', component:HomeComponent
  },
  {
    path:'addTocart', component:AddToCartComponent
  },
  {
    path:'allProducts', component:AllProductsComponent,canActivate: [AuthGuard]
  },
  {
    path:'adminLogin', component:AdminLoginComponent ,
  },
  {
    path:'adminDashboard', component:AdminDashboardComponent ,canActivate: [RoleGuard]
  },
  {
    path:'login', component:LoginFormComponent,
  },
  {
    path:'register', component:RegisterComponent
  },
  {
    path:'forgot-password', component:ForgotPasswordComponent
  },
  {
    path:'verify-email', component:VerifyEmailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
