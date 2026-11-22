
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { LoginDialogService } from '../../services/loginDialog/login-dialog.service';

let isLoginPopupOpen = false;

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const loginDialog = inject(LoginDialogService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      if (
        error.status === 401 &&
        !isLoginPopupOpen &&
        !router.url.includes('/login')
      ) {
        isLoginPopupOpen = true;

        loginDialog.showLoginPopup()
          .then((result) => {
            if (result.isConfirmed) {
              router.navigate(['/login']);
            }
          })
          .finally(() => {
            isLoginPopupOpen = false;
          });
      }

      return throwError(() => error);
    })
  );
};
