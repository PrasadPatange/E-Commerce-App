import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit {
  constructor(
    public loginService: LoginService,
    public router: Router,
    private formBuilder: FormBuilder,
    public toastr: ToastrService
  ) {}

  loginForm!: FormGroup;
  hide: boolean = true;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, Validators.required],
    });
  }

  async onSignin(email: string, password: string): Promise<void> {
    await this.loginService.signIn(email, password);

    if (this.loginService.isLoggedIn) {
      this.router.navigate(['/adminDashboard']);
    }

    this.loginForm.reset();
  }
}
