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

  getPaymentData(limit: number, skip: number): Observable<any[]> {
    console.log(this.apiDomain);
    let route = `/payment?limit=${limit}&skip=${skip}`;
    let finalUrl = this.apiDomain + route;
    return this.http.get<any[]>(finalUrl);
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

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error("An error occurred:", error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error("Something bad happened; please try again later."));
  }
}
