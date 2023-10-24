import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Observable, catchError, throwError } from 'rxjs';
import {  CryptoResponse } from '../../core/interfaces/interfaces';
import { CryptoHistoryResponse } from '../../core/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  constructor(private http: HttpClient) { }


  fetchCryptoData(): Observable<CryptoResponse> {
    const apiUrl = 'https://api.coincap.io/v2/assets';
    return this.http.get<CryptoResponse>(apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching crypto data:', error);
        return throwError(() => new Error('error'));
      })
    );
  }


  fetchCryptoHistory(
    cryptoId: string,
    interval: string
  ): Observable<CryptoHistoryResponse> {
    const apiUrl = `https://api.coincap.io/v2/assets/${cryptoId}/history?interval=${interval}`;
    return this.http.get<CryptoHistoryResponse>(apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching crypto history:', error);
        return throwError(() => new Error('error'));
      })
    );
  }
}
