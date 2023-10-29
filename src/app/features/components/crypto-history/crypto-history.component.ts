import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoHistoryData, CryptoHistoryResponse, } from 'src/app/core/interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-crypto-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './crypto-history.component.html',
  styleUrls: ['./crypto-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CryptoHistoryComponent implements OnInit {
  public cryptoId!: string;
  public cryptoHistory: CryptoHistoryData[] = [];
  public currentInterval = 'm1';
  private cryptoHistoryChart!: Chart;

  constructor(
    private route: ActivatedRoute,
    private cryptoService: CryptoService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.cryptoId = params['id'];
      this.fetchCryptoHistory();
    });
  }

  public fetchCryptoHistory() {
    this.cryptoService
      .fetchCryptoHistory(this.cryptoId, this.currentInterval)
      .subscribe(
        (response: CryptoHistoryResponse) => {
          this.cryptoHistory = response.data;
          this.updateCryptoHistoryChart();
          this.cd.markForCheck();
        },
        (error) => {
          console.error('Error fetching crypto history:', error);
        }
      );
  }

  public changeInterval(interval: string) {
    this.currentInterval = interval;
    this.fetchCryptoHistory();
  }
  
  private initializeCryptoHistoryChart() {
    const ctx = document.getElementById(
      'cryptoHistoryChart'
    ) as HTMLCanvasElement;
    this.cryptoHistoryChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.cryptoHistory.map((data) =>
          new Date(data.date).toLocaleDateString()
        ),
        datasets: [
          {
            label: 'Price (USD)',
            data: this.cryptoHistory.map((data) => data.priceUsd),
            borderColor: '#0054fe',
            pointBorderWidth: 0,
            borderWidth: 2,
          },
        ],
      },
    });
  }

  private updateCryptoHistoryChart() {
    if (!this.cryptoHistoryChart) {
      this.initializeCryptoHistoryChart();
    } else {
      this.cryptoHistoryChart.data.labels = this.cryptoHistory.map((data) =>
        new Date(data.date).toLocaleDateString()
      );// Update the chart's X labels with new data.
      this.cryptoHistoryChart.data.datasets[0].data = this.cryptoHistory.map(
        (data) => data.priceUsd
      );// Update the chart's Y data points with new data.
      this.cryptoHistoryChart.update();
    }
  }
}
