import { Injectable, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProdEnum } from 'src/app/enum/ProdEnum';
import { LoginService } from 'src/app/Services/login.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    public router: Router,
    public loginService: LoginService,
    public toastr: ToastrService
  ) {}

  canActivate() {
    let Role = sessionStorage.getItem(ProdEnum.EMAIL) || 'You';
    if (
      Role == `"prasadpatange2603@gmail.com"` &&
      this.loginService.LoggedIn()
    ) {
      return true;
    }
    this.toastr.warning(
      `${Role} Don't have Admin rights`,
      'Only Admin Can Access'
    );
    this.router.navigate(['adminLogin']);
    return false;
  }
}
