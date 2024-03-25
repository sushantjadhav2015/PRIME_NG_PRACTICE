import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { CommonApicallService } from '../../interceptor-and-error/common-api-call.service';
import { api } from '../../interceptor-and-error/end-point';

export interface AuthResponseData {
  idToken: string;
  id?: string;
  name?: string;
  photoUrl?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  refreshToken?: string;
  expiresIn: string;
  localId?: string;
  registered?: boolean;
  provider?: string;
}

interface UserData {
  email: string;
  _token: string;
  expirationDate: string;
  localId: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLoggedIn = false;
  userSub = new BehaviorSubject<any>(null);
  clearTimeout: any;

  constructor(private router: Router) {}
  socialAuthService = inject(SocialAuthService);
  commonApiService = inject(CommonApicallService);

  signUp(email: string, password: string): Observable<AuthResponseData> {
    const params = { email, password, returnSecureToken: true };
    return this.commonApiService.post(api('USERS.SIGN_UP'), params);
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    const params = { email, password, returnSecureToken: true };
    return this.commonApiService.post(api('USERS.LOGIN'), params);
  }

  handleUser(response: any) {
    const expireDate = new Date(
      new Date().getTime() + +response.expiresIn * 1000
    );

    const user: any = {
      email: response.email,
      localId: response.localId,
      idToken: response.idToken,
      expireDate: expireDate,
    };

    this.userSub.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogout(+response.expiresIn * 1000);
  }

  autoLogin() {
    const userDataString = localStorage.getItem('userData');

    if (!userDataString) {
      this.router.navigate(['/login']);
      return;
    }

    const userData: UserData = JSON.parse(userDataString);

    const user = {
      email: userData.email,
      localId: userData.localId,
      _token: userData._token,
      expirationDate: new Date(userData.expirationDate),
    };

    if (user._token) {
      this.userSub.next(user);
    }

    const expirationDate = new Date(userData.expirationDate).getTime();
    const remainingTime = expirationDate - new Date().getTime();

    this.autoLogout(remainingTime);
  }

  autoLogout(expirationDate: number) {
    console.log(expirationDate);
    this.clearTimeout = setTimeout(() => {
      this.logout();
    }, expirationDate);
  }

  logout() {
    this.userSub.next(null);
    this.router.navigate(['/login']);
    localStorage.removeItem('userData');
    if (this.clearTimeout) {
      clearTimeout(this.clearTimeout);
    }
  }

  isAuthenticated() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.isLoggedIn);
      }, 1000);
    });
  }
}
