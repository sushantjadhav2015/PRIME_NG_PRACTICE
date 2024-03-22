import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

export interface AuthResponseData {
  idToken: string;
  id?: string;
  name?: string;
  photoUrl?:string;
  firstName?: string;
  lastName?:string;
  email: string;
  refreshToken?: string;
  expiresIn: string;
  localId?: string;
  registered?: boolean;
  provider?: string
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

  constructor(private http: HttpClient, private router: Router) {}
  socialAuthService = inject(SocialAuthService)

  // socialLogin(provider: string): Promise<SocialUser> {
  //   return this.socialAuthService.signIn(provider)
  //     .then((socialUser: SocialUser) => {
  //       console.log('Social login successful:', socialUser);
  //       let user: any = socialUser
  //       user['expiresIn'] = new Date()
  //       this.handleUser(user)  
  //       return socialUser;
  //     })
  //     .catch((error) => {
  //       console.error('Social login error:', error);
  //       throw error; 
  //     });
  // }
    
  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBWO1ophAQ7fK1v_TO8-4S5TK0BFIJGvKg
    `,
        { email, password, returnSecureToken: true }
      )
      .pipe(catchError(this.getErrorHandler), tap(this.handleUser.bind(this)));
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBWO1ophAQ7fK1v_TO8-4S5TK0BFIJGvKg
    `,
        { email, password, returnSecureToken: true }
      )
      .pipe(catchError(this.getErrorHandler), tap(this.handleUser.bind(this)));
  }

  handleUser(response: any) {
    const expireDate = new Date(
      new Date().getTime() + +response.expiresIn * 1000
    );

    const user: any = {
      email: response.email,
      localId: response.localId,
      idToken: response.idToken,
      expireDate: expireDate
    };

    this.userSub.next(user);    
    localStorage.setItem('userData', JSON.stringify(user));
    this.autoLogout(+response.expiresIn * 1000);
  }

  getErrorHandler(errorRes: HttpErrorResponse) {
    let errorMessage = 'An Error Occurred';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Email Already Exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email Not Found';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Invalid Password';
        break;
      case 'INVALID_EMAIL':
        errorMessage = 'Invalid Email';
        break;
    }
    return throwError(errorMessage);
  }

  autoLogin() {
    const userDataString = localStorage.getItem('userData');
  
    if (!userDataString) {
      this.router.navigate(['/login'])
      return;
    }
  
    const userData: UserData = JSON.parse(userDataString);

    const user = {
      email: userData.email,
      localId: userData.localId,
      _token: userData._token,
      expirationDate: new Date(userData.expirationDate)
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