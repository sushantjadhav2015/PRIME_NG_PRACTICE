import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  PLATFORM_ID,
  ViewChild,
  inject,
  ComponentFactoryResolver,
  ViewContainerRef,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared-module/services/auth-service.service';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Router } from '@angular/router';
import { PlaceholderDirective } from '../../shared-module/directive/placeholder.directive';
import { Subscription } from 'rxjs';
import { AlertComponent } from '../../shared-module/component/alert-dialog-dynamically/alert.component';
import { MessageService } from 'primeng/api';
import { ROUTES } from '../../shared-module/constants/routes-constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  // providers: [MessageService],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  rememberMe: boolean = false;

  user!: any;
  loggedIn!: boolean;
  closeSub!: Subscription;
  @ViewChild(AlertComponent) alertComponent!: AlertComponent;

  constructor(
    private formBuilder: FormBuilder,
    private authservice: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}
  socialAuthService = inject(SocialAuthService);

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['sushant@gmail.com', Validators.required],
      password: ['123456', Validators.required],
      rememberMe: [false],
    });

    // Check if the environment is browser before accessing localStorage
    if (isPlatformBrowser(this.platformId)) {
      const storedCredentials = JSON.parse(
        localStorage.getItem('credentials') || '{}'
      );

      if (storedCredentials) {
        this.loginForm.patchValue({
          username: storedCredentials.username,
          password: storedCredentials.password,
          rememberMe: true,
        });
      }
    }

    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
      console.log(user);
      this.user['expiresIn'] = new Date();
      this.authservice.handleUser(user);
      this.goToDashboard();
    });
  }

  onSubmit() {
    const f = this.loginForm.value;
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;

      if (this.loginForm.value.rememberMe) {
        this.authservice.login(username, password)?.subscribe({
          next: (res) => {
            localStorage.setItem('credentials', JSON.stringify({ res }));
            this.goToDashboard();
          },
        });
      } else {
        localStorage.removeItem('credentials');
      }
    }
  }

  goToDashboard() {
    this.router.navigate([ROUTES.DASHBOARD]);
  }
}
