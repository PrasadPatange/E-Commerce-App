import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
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
  async onSignup(email: string, password: string): Promise<void> {
    await this.loginService.signUp(email, password);
    if (this.loginService.isLoggedIn)
      this.toastr.success(`${email} Created Successfully!!!`);
    // window.location.reload();
    // this.router.navigate(['/login']);
  }
}
