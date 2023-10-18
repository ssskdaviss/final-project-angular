import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoHistoryData, CryptoHistoryResponse } from 'src/app/core/interfaces/interfaces';
import { ActivatedRoute } from '@angular/router';
import { CryptoService } from 'src/app/services/crypto.service';

@Component({
  selector: 'app-crypto-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './crypto-history.component.html',
  styleUrls: ['./crypto-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CryptoHistoryComponent implements OnInit {
  public cryptoId!: string;
  public cryptoHistory: CryptoHistoryData[] = [];
  public currentInterval = 'm1';

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

  fetchCryptoHistory() {
    this.cryptoService.fetchCryptoHistory(this.cryptoId, this.currentInterval).subscribe(
      (response: CryptoHistoryResponse) => {
        this.cryptoHistory = response.data;
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
}
