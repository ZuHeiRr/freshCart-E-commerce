import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { AddressService } from '../../core/services/address/address.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { LanguageService } from '../../core/i18n/language.service';

@Component({
  selector: 'app-addresses',
  imports: [TranslatePipe, ReactiveFormsModule],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css',
})
export class AddressesComponent implements OnInit {
  readonly addressService = inject(AddressService);
  private readonly languageService = inject(LanguageService);

  private readonly fb = inject(FormBuilder);
  private readonly toastr = inject(ToastrService);

  loading = signal(true);
  submitting = signal(false);
  showForm = signal(false);
  deletingId = signal<string | null>(null);

  addressForm = this.fb.group({
    name: ['', [Validators.required]],
    details: ['', [Validators.required]],
    phone: [
      '',
      [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
    ],
    city: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.getAddresses();
  }

  getAddresses(): void {
    this.loading.set(true);

    this.addressService.getLoggedUserAddresses().subscribe({
      next: () => {
        this.loading.set(false);
      },
      error: (error) => {

        this.loading.set(false);
      },
    });
  }

  addAddress(): void {
    if (this.addressForm.invalid) {
      this.addressForm.markAllAsTouched();
      return;
    }

    this.submitting.set(true);

    this.addressService
      .addAddress(this.addressForm.value as any)
      .subscribe({
        next: (response) => {

          this.toastr.success(this.languageService.translate('Address added successfully'));

          this.addressForm.reset();
          this.showForm.set(false);
          this.submitting.set(false);

          this.getAddresses();
        },
        error: (error) => {

          this.toastr.error(this.languageService.translate('Failed to add address'));
          this.submitting.set(false);
        },
      });
  }

 deleteAddress(id: string): void {
  Swal.fire({
    title: this.languageService.translate('Are you sure?'),
    text: this.languageService.translate('You will not be able to recover this address!'),
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#dc2626',
    cancelButtonColor: '#6b7280',
    confirmButtonText: this.languageService.translate('Yes, delete it!'),
    cancelButtonText: this.languageService.translate('Cancel'),
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      this.deletingId.set(id);

      this.addressService.removeAddress(id).subscribe({
        next: () => {
          Swal.fire({
            title: this.languageService.translate('Deleted!'),
            text: this.languageService.translate('Your address has been deleted.'),
            icon: 'success',
            timer: 1800,
            showConfirmButton: false,
          });

          this.deletingId.set(null);
          this.getAddresses();
        },
        error: (error) => {
         

          Swal.fire({
            title: this.languageService.translate('Error!'),
            text: this.languageService.translate('Failed to delete address.'),
            icon: 'error',
            confirmButtonColor: '#dc2626',
          });

          this.deletingId.set(null);
        },
      });
    }
  });
}
}