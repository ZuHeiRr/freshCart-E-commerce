import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { Observable, firstValueFrom } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private readonly httpClient = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);
  islogged = signal(false);

  signUp(data: any) {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, data);
  }

  signIn(data: any) {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signin`, data);
  }

  forgetPassword(data: any) {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`, data);
  }

  verifyResetCode(data: any) {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`, data);
  }

  resetPassword(data: any) {
    return this.httpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`, data);
  }

  verifyToken(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/auth/verifyToken`);
  }

  checkAuth(): Promise<void> {
    // Browser storage is not available during SSR. Validate the same token key
    // that the login component saves and the HTTP interceptor sends.
    if (!isPlatformBrowser(this.platformId)) {
      this.islogged.set(false);
      return Promise.resolve();
    }

    const token = localStorage.getItem('ecommToken');
    if (!token) {
      this.islogged.set(false);
      return Promise.resolve();
    }

    return firstValueFrom(this.verifyToken())
      .then(() => {
        this.islogged.set(true);
      })
      .catch(() => {
        localStorage.removeItem('ecommToken');
        localStorage.removeItem('ecommUser');
        this.islogged.set(false);
      });
  }
}
