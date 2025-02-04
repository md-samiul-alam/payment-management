import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutoCompleteService {
  private apiDomain: string = environment.apiDomain;

  constructor(private http: HttpClient) { }

  getCurrencyData() {
    let finalUrl = 'https://countriesnow.space/api/v0.1/countries/currency';
    return this.http.get<any>(finalUrl);
  }
}
