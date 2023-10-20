import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoService } from 'src/app/services/crypto.service';
import {
  CryptoData,
  cryptoInterface,
} from 'src/app/core/interfaces/interfaces';
import { NumberFormatPipe } from 'src/app/shared/number-format.pipe';
import { Router, RouterLink } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BuyCryptoComponent } from 'src/app/modals/buy-crypto/buy-crypto.component';

@Component({
  selector: 'app-buy-sell',
  standalone: true,
  imports: [CommonModule, NumberFormatPipe, BuyCryptoComponent],
  templateUrl: './buy-sell.component.html',
  styleUrls: ['./buy-sell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuySellComponent {
  public cryptoData: CryptoData[] = [];
  public searchText: string = '';

  constructor(
    private cryptoService: CryptoService,
    private cd: ChangeDetectorRef,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchCryptoData();
  }

  public fetchCryptoData() {
    this.cryptoService.fetchCryptoData().subscribe(
      (response) => {
        this.cryptoData = response.data;
        this.cd.markForCheck();
      },
      (error) => {
        console.error('Error in fetchCryptoData:', error);
      }
    );
  }

  dialogRef!: MatDialogRef<BuyCryptoComponent>;
  openBuyModal(crypto: CryptoData): void {
    this.dialogRef = this.dialog.open(BuyCryptoComponent, {
      data: {
        id: crypto.id,
        name: crypto.name,
        priceUsd: crypto.priceUsd,
        symbol: crypto.symbol,
      },
    });

    this.dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  closeBuyModal(): void {
    this.dialogRef.close();
  }
}
