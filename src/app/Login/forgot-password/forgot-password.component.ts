import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/Services/login.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    public logService: LoginService
  ) {}

  loginForm!: FormGroup;
  hide: boolean = true;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required]],
    });
  }

  async ForgotPassword(passResetEmail: string) {
    await this.logService.ForgotPassword(passResetEmail);
    console.log('Forgot Password Email : ', passResetEmail);
  }
}
