import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl: string = 'http://localhost:8000/payment?limit=20&skip=20';

  constructor(private http: HttpClient) {
    console.log('inside service constructor')
  }

  getData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl)
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
