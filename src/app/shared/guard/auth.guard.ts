import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';

import { ToastrService } from 'ngx-toastr';
import { ProdEnum } from 'src/app/enum/ProdEnum';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    public loginService: LoginService,
    public router: Router,
    private toastr: ToastrService
  ) {}
  canActivate() {
    let verify = sessionStorage.getItem(ProdEnum.EMAIL_VERIFIED);
    if (verify == `true` && this.loginService.LoggedIn()) {
      return true;
    }
    this.toastr.warning('You have not logged In', 'Please Sign In');
    this.router.navigate(['login']);
    return false;
  }
}
