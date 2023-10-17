import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CryptoResponse } from '../core/interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor(private http: HttpClient) {}

  fetchCryptoData(): Observable<CryptoResponse> {
    const apiUrl = 'https://api.coincap.io/v2/assets';
    return this.http.get<CryptoResponse>(apiUrl);
  }
}
