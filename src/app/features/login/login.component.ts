
import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../core/auth/services/authService/auth-service.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [TranslatePipe, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private readonly authService = inject(AuthServiceService);
  private readonly router = inject(Router);

  isLoading = signal(false);
  errorMessage = signal('');
  showPassword = signal(false);

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),

    rememberMe: new FormControl(false),
  });

  // Getters
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  togglePassword(): void {
    this.showPassword.update((value) => !value);
  }

  submitLogin(): void {
    this.errorMessage.set('');

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

    const { email, password } = this.loginForm.getRawValue();

    this.authService.signIn({ email, password }).subscribe({
      next: (res:any) => {
        this.isLoading.set(false);
        console.log("login",res);
        localStorage.setItem('ecommToken', res.token);
        localStorage.setItem('ecommUser', JSON.stringify(res.user));

        this.authService.islogged.set(true)


        

      
       setTimeout(() => {
           this.router.navigate(['/home']);
        }, 1000);
      },

      error: (err) => {
        this.isLoading.set(false);

        this.errorMessage.set(
          err.error?.message || 'Invalid email or password. Please try again.',
        );
      },
    });
  }
}
