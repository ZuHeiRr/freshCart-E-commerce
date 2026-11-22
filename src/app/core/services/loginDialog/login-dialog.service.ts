import { Injectable, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { LanguageService } from '../../i18n/language.service';

@Injectable({
  providedIn: 'root',
})
export class LoginDialogService {
  private readonly languageService = inject(LanguageService);

  showLoginPopup() {
    return Swal.fire({
      icon: 'warning',
      title: this.languageService.translate('Login Required'),
      text: this.languageService.translate('Please login first to continue this action.'),
      showCancelButton: true,
      confirmButtonText: this.languageService.translate('Login'),
      cancelButtonText: this.languageService.translate('Cancel'),
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#6b7280',
      reverseButtons: true,
      allowOutsideClick: false,
    });
  }
}