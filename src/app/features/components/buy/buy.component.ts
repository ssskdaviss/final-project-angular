import { ChangeDetectionStrategy, ChangeDetectorRef, Component, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { CryptoData } from 'src/app/core/interfaces/interfaces';
import { NumberFormatPipe } from 'src/app/shared/pipes/number-format.pipe';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BuyCryptoComponent } from '../../modals/buy-crypto/buy-crypto.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buy',
  standalone: true,
  imports: [CommonModule, NumberFormatPipe, BuyCryptoComponent, FormsModule],
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class BuyComponent {
  public cryptoData: CryptoData[] = [];
  public searchText: string = '';

  constructor(
    private cryptoService: CryptoService,
    private cd: ChangeDetectorRef,
    public dialog: MatDialog) { }

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
  public dialogRef!: MatDialogRef<BuyCryptoComponent>;
  public openBuyModal(crypto: CryptoData): void {
    this.dialogRef = this.dialog.open(BuyCryptoComponent, {
      //pass data to modal
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

  public getChangeTextClass(changePercent: number): string {
    return changePercent < 0 ? 'red-text' : 'green-text';
  }

  public filterCryptoData(): CryptoData[] {
    const searchText = this.searchText.toLowerCase();
    return this.cryptoData.filter(crypto =>
      crypto.name.toLowerCase().includes(searchText) ||
      crypto.symbol.toLowerCase().includes(searchText)
    );
  }
}
