
import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthServiceService } from '../../core/auth/services/authService/auth-service.service';
import { TranslatePipe } from '../../core/i18n/translate.pipe';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [TranslatePipe, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly authService = inject(AuthServiceService);
  private readonly router = inject(Router);

  errorMessage = signal('');
  successMsg = signal('');
  isLoading = signal(false);

  // Confirm Password Validator
  confirmPasswordValidator: ValidatorFn = (
    control: AbstractControl,
  ): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const rePassword = control.get('rePassword')?.value;

    if (!password || !rePassword) {
      return null;
    }

    return password === rePassword
      ? null
      : { confirmPassword: true };
  };

  // Register Form
 registerForm = new FormGroup(
  {
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),

    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),

    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ),
    ]),

    rePassword: new FormControl('', [
      Validators.required,
    ]),

    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
  },
  { validators: this.confirmPasswordValidator }
);
  // Submit Register
  submitRegister(): void {
    this.errorMessage.set('');
    this.successMsg.set('');

    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

    this.authService.signUp(this.registerForm.value).subscribe({
      next: (res: any) => {
        this.isLoading.set(false);
        this.successMsg.set(res.message);

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },

      error: (err) => {
        this.isLoading.set(false);

        this.errorMessage.set(
          err.error?.message || 'Registration failed. Please try again.',
        );
      },
    });
  }

  // Helper to access form controls
get name() {
  return this.registerForm.get('name');
}

get email() {
  return this.registerForm.get('email');
}

get password() {
  return this.registerForm.get('password');
}

get rePassword() {
  return this.registerForm.get('rePassword');
}

get phone() {
  return this.registerForm.get('phone');
}
}
