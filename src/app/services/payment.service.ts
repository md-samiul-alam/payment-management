import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiDomain: string = 'http://localhost:8000';

  constructor(private http: HttpClient) {
    console.log('inside service constructor')
  }

  getPaymentData(): Observable<any[]> {
    let route = '/payment?limit=20&skip=20';
    let finalUrl = this.apiDomain + route;
    return this.http.get<any[]>(finalUrl)
      .pipe(
        tap(data => console.log('Data fetched:', data)),
        catchError(this.handleError)
      );
  }

  getPaymentDataById(id: string): Observable<any[]> {
    let route = '/payment/' + id;
    let finalUrl = this.apiDomain + route;
    return this.http.get<any[]>(finalUrl)
      .pipe(
        tap(data => console.log('Data fetched:', data)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
