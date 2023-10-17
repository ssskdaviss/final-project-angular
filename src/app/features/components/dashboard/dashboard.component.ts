import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  cryptoData: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchCryptoData();
  }

  fetchCryptoData() {
    const apiUrl = 'https://api.coincap.io/v2/assets';

    this.http.get(apiUrl).subscribe((response: any) => {
      this.cryptoData = response.data;
    });
  }
}
