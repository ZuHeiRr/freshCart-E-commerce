import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { AuthServiceService } from '../../core/auth/services/authService/auth-service.service';
import { Router, RouterLink } from '@angular/router';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
type ResetStep = 'email' | 'otp' | 'newPassword';

@Component({
  selector: 'app-forget-pass',
  imports: [TranslatePipe, ReactiveFormsModule,RouterLink],
  templateUrl: './forget-pass.component.html',
  styleUrl: './forget-pass.component.css',
})
export class ForgetPassComponent {
   private readonly authService = inject(AuthServiceService);
  private readonly router = inject(Router);

  // Current step flag
  currentStep = signal<ResetStep>('email');

  isLoading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  showPassword = signal(false);
  showConfirmPassword = signal(false);

  // Keep email between steps
  userEmail = signal('');

  // Step 1: Email Form
  emailForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
  });

  // Step 2: OTP Form
  otpForm = new FormGroup({
    resetCode: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{6}$/),
    ]),
  });

  // Confirm password validator
  confirmPasswordValidator: ValidatorFn = (
    control: AbstractControl,
  ): ValidationErrors | null => {
    const password = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (!password || !confirmPassword) {
      return null;
    }

    return password === confirmPassword
      ? null
      : { passwordMismatch: true };
  };

  // Step 3: New Password Form
  newPasswordForm = new FormGroup(
    {
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
      ]),

      confirmPassword: new FormControl('', [
        Validators.required,
      ]),
    },
    { validators: this.confirmPasswordValidator },
  );

  // Getters
  get email() {
    return this.emailForm.get('email');
  }

  get resetCode() {
    return this.otpForm.get('resetCode');
  }

  get newPassword() {
    return this.newPasswordForm.get('newPassword');
  }

  get confirmPassword() {
    return this.newPasswordForm.get('confirmPassword');
  }

  // Step 1: Send OTP
  submitEmail(): void {
    this.clearMessages();

    if (this.emailForm.invalid) {
      this.emailForm.markAllAsTouched();
      return;
    }

    const email = this.emailForm.value.email!;

    this.isLoading.set(true);

    this.authService.forgetPassword({ email }).subscribe({
      next: (res: any) => {
        this.isLoading.set(false);
        this.userEmail.set(email);
        this.successMessage.set(
          res.message || 'Verification code sent successfully.',
        );
        this.currentStep.set('otp');
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(
          err.error?.message || 'Unable to send verification code.',
        );
      },
    });
  }

  // Step 2: Verify OTP
  submitOtp(): void {
    this.clearMessages();

    if (this.otpForm.invalid) {
      this.otpForm.markAllAsTouched();
      return;
    }

    const resetCode = this.otpForm.value.resetCode!;

    this.isLoading.set(true);

    this.authService.verifyResetCode({ resetCode }).subscribe({
      next: (res: any) => {
        this.isLoading.set(false);
        this.successMessage.set(
          res.message || 'Code verified successfully.',
        );
        this.currentStep.set('newPassword');
      },
      error: (err: any) => {
        this.isLoading.set(false);
        this.errorMessage.set(
          err.error?.message || 'Invalid or expired verification code.',
        );
      },
    });
  }

  // Step 3: Reset Password
  submitNewPassword(): void {
    this.clearMessages();

    if (this.newPasswordForm.invalid) {
      this.newPasswordForm.markAllAsTouched();
      return;
    }

    const newPassword = this.newPasswordForm.value.newPassword!;

    this.isLoading.set(true);

    this.authService.resetPassword({
      email: this.userEmail(),
      newPassword,
    }).subscribe({
      next: () => {
        this.isLoading.set(false);

        // Back to login after successful reset
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(
          err.error?.message || 'Unable to reset password.',
        );
      },
    });
  }

  // Password visibility
  togglePassword(): void {
    this.showPassword.update((value) => !value);
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword.update((value) => !value);
  }

  // Navigation between steps
  backToEmail(): void {
    this.clearMessages();
    this.currentStep.set('email');
  }

  backToOtp(): void {
    this.clearMessages();
    this.currentStep.set('otp');
  }

  private clearMessages(): void {
    this.errorMessage.set('');
    this.successMessage.set('');
  }
}
