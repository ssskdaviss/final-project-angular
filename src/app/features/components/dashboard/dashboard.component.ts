import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CryptoService } from 'src/app/services/crypto.service';
import { CryptoData } from 'src/app/core/interfaces/interfaces';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  cryptoData: CryptoData[] = [];

  constructor(private cryptoService: CryptoService) {}

  ngOnInit(): void {
    this.fetchCryptoData();
  }

  fetchCryptoData() {
    this.cryptoService.fetchCryptoData().subscribe((response) => {
      this.cryptoData = response.data;
    });
  }
}
