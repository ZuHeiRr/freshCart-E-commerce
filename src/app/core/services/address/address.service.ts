import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IAddress } from '../../models/iaddress.interface';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private readonly httpClient = inject(HttpClient);

  addresses = signal<IAddress[]>([]);

  getLoggedUserAddresses(): Observable<any> {
    return this.httpClient
      .get(`${environment.baseUrl}/api/v1/addresses`)
      .pipe(
        tap((response: any) => {
          console.log('Addresses:', response);
          this.addresses.set(response.data ?? []);
        })
      );
  }

  addAddress(address: Omit<IAddress, '_id'>): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/addresses`,
      address
    );
  }

  removeAddress(id: string): Observable<any> {
    return this.httpClient.delete(
      `${environment.baseUrl}/api/v1/addresses/${id}`
    );
  }

  getAddress(id: string): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}/api/v1/addresses/${id}`
    );
  }
}