import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  constructor(
    public loginService: LoginService,
    public router: Router,
    public toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  logout(): void {
    this.loginService.logout();
    this.toastr.success('Logout Successfully!!!');
    this.router.navigate(['/adminLogin']);
  }
}
