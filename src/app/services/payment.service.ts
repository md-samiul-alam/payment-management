import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiDomain: string = environment.apiDomain;

  constructor(private http: HttpClient) { }

  getPaymentData(payload: any) {
    let params = this.convertToQueryParam(payload);
    let route = `/payment?${params.toString()}`;
    let finalUrl = this.apiDomain + route;
    return this.http.get<any>(finalUrl, payload);
  }

  getPaymentDataById(id: string): Observable<any[]> {
    let route = "/payment/" + id;
    let finalUrl = this.apiDomain + route;
    return this.http.get<any[]>(finalUrl);
  }

  deletePaymentDataById(id: string): Observable<any[]> {
    let route = "/payment/" + id;
    let finalUrl = this.apiDomain + route;
    return this.http.delete<any[]>(finalUrl);
  }

  private convertToQueryParam(payload: any) {
    const params = new URLSearchParams();
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        let value = payload[key];
        if (value instanceof Date) {
          value = value.toISOString();
        }
        else if (typeof value === 'object' && value !== null) {
          value = JSON.stringify(value);
        }
        if (value !== undefined && value !== null) {
          params.append(key, encodeURIComponent(String(value)));
        }
      }
    }
    return params;
  }
}
