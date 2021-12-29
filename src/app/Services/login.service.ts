import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProdEnum } from '../enum/ProdEnum';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  isLoggedIn: boolean = false;
  userName: any;
  token!: any;
  interval: any;
  verify_Email!: string;

  constructor(
    public fireAuth: AngularFireAuth,
    public router: Router,
    private ngZone: NgZone,
    public toastr: ToastrService
  ) {}

  async signIn(email: string, password: string): Promise<void> {
    await this.fireAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.isLoggedIn = true;
        sessionStorage.setItem(ProdEnum.EMAIL, JSON.stringify(res.user?.email));
        sessionStorage.setItem(
          ProdEnum.EMAIL_VERIFIED,
          JSON.stringify(res.user?.emailVerified)
        );
        this.userName = sessionStorage.getItem(ProdEnum.EMAIL);
      })
      .catch((error: any) => {
        this.toastr.error(error, 'Error in Sign In : ');
      });
    await this.GetToken();
    await this.lastAction(Date.now());
    await this.initListener();
    await this.initInterval();
  }

  GetToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.fireAuth.onAuthStateChanged((user) => {
        if (user) {
          user
            .getIdToken()
            .then((idToken) => {
              resolve(idToken);
              sessionStorage.setItem(ProdEnum.TOKEN, JSON.stringify(idToken));
              this.token = sessionStorage.getItem(ProdEnum.TOKEN);
              console.log('token => ', this.token);
            })
            .catch((error: any) => {
              this.toastr.error(error, 'Error in Token : ');
            });
        }
      });
    });
  }
  async signUp(email: string, password: string): Promise<void> {
    const newUser = await this.fireAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    console.log('newUser : ', newUser);
    this.verify_Email = email;
    console.log('verify_Email : ', this.verify_Email);
    // Send email verfificaiton when new user sign up
    await newUser.user
      ?.sendEmailVerification()
      .then(() => {
        this.router.navigate(['verify-email']);
      })
      .catch((error: any) => {
        window.alert(error);
        console.log('Error Sign Up : ', error);
        this.toastr.error(error, 'Error Sign Up : ');
      });
  }

  // Reset Forgot password
  async ForgotPassword(passwordResetEmail: string) {
    await this.fireAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.toastr.success(
          'Password reset email sent, check your inbox.',
          `Check Your inbox ${passwordResetEmail}`
        );
      })
      .catch((error: any) => {
        window.alert(error);
        this.toastr.error(error, 'Error in Forgot Password : ');
      });
  }

  logout(): void {
    this.fireAuth.signOut();
    sessionStorage.removeItem(ProdEnum.EMAIL);
    sessionStorage.removeItem(ProdEnum.TOKEN);
    sessionStorage.removeItem(ProdEnum.LAST_ACTION);
    sessionStorage.removeItem(ProdEnum.EMAIL_VERIFIED);
    this.stopInterval();
  }

  LoggedIn() {
    return (
      !!sessionStorage.getItem(ProdEnum.TOKEN) &&
      !!sessionStorage.getItem(ProdEnum.EMAIL_VERIFIED)
    );
  }

  // ************************************
  // last action
  getLastAction() {
    return sessionStorage.getItem(ProdEnum.LAST_ACTION) || '{}';
  }

  // set last action
  lastAction(value: number) {
    return sessionStorage.setItem(ProdEnum.LAST_ACTION, JSON.stringify(value));
  }

  // start event listener
  initListener(): void {
    this.ngZone.runOutsideAngular(() => {
      document.body.addEventListener('click', () => this.reset());
    });
  }
  // time interval
  initInterval(): void {
    this.ngZone.runOutsideAngular(() => {
      this.interval = setInterval(() => {
        this.check();
      }, 1000);
    });
  }

  stopInterval(): void {
    clearInterval(this.interval);
  }
  // reset timer
  reset(): void {
    this.lastAction(Date.now());
  }

  // check timer
  check(): void {
    const now = Date.now();
    const timeLeft = parseInt(this.getLastAction()) + 3 * 60 * 1000; // 3 min
    const diff = timeLeft - now;
    const isTimeout = diff < 0;
    this.ngZone.run(() => {
      if (isTimeout) {
        this.logout();
        this.toastr.error(
          'Your Session Expired due to longer Inactivity, Login Again To Continue'
        );
        this.router.navigate(['login']);
      }
    });
  }
}
