import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, BehaviorSubject } from 'rxjs';
import { CryptoResponse } from '../../core/interfaces/interfaces';
import { CryptoHistoryResponse } from '../../core/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  constructor(private http: HttpClient) { }


  public userBalanceSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  userBalance$: Observable<number> = this.userBalanceSubject.asObservable();

  public updateUserBalance(newBalance: number) {
    this.userBalanceSubject.next(newBalance);
  }


  public fetchCryptoData(): Observable<CryptoResponse> {
    const apiUrl = 'https://api.coincap.io/v2/assets';
    return this.http.get<CryptoResponse>(apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching crypto data:', error);
        return throwError(() => new Error('error'));
      })
    );
  }


  public fetchCryptoHistory(cryptoId: string, interval: string): Observable<CryptoHistoryResponse> {
    const apiUrl = `https://api.coincap.io/v2/assets/${cryptoId}/history?interval=${interval}`;
    return this.http.get<CryptoHistoryResponse>(apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching crypto history:', error);
        return throwError(() => new Error('error'));
      })
    );
  }
}
