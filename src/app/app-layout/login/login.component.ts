import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm!: FormGroup;
  rememberMe: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
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
          rememberMe: true
        });
      }
    }
  }
  
  onSubmit() {
    const f = this.loginForm.value
    console.log('Check box value is :', f.rememberMe);
    
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;

      if (this.loginForm.value.rememberMe) {
        localStorage.setItem('credentials', JSON.stringify({ username, password }));
        this.loginForm.reset()
      } else {
        localStorage.removeItem('credentials');
        this.loginForm.reset()
      }

      // Implement login functionality here
      console.log('Logging in with:', username, password);
    }
  }
}
