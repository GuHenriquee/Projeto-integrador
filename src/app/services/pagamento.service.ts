import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class pagamentoService {
  private backendUrl = 'http://localhost:3000'; // Replace with your backend URL

  constructor(private http: HttpClient) { }

  /**
   * Processes the payment by sending data to the backend.
   * @param paymentData The data collected by the Mercado Pago Brick.
   * @returns An Observable with the payment result.
   */
  processPayment(paymentData: any): Observable<any> {
    return this.http.post(`${this.backendUrl}/process_payment`, paymentData);
  }

  // If you need to generate a preference ID on the backend, you could add a method here:
  // generatePreferenceId(): Observable<any> {
  //   return this.http.post(`${this.backendUrl}/generate_preference`, {});
  // }
}
