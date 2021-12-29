import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
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

    if (this.loginService.LoggedIn()) {
      this.toastr.success(`${email} login Successfully!!!`);
      this.router.navigate(['/allProducts']);
    } else {
      this.toastr.warning('Check Email and Password');
    }
    this.loginForm.reset();
  }
}
