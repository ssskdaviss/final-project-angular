import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoService } from 'src/app/services/crypto.service';
import { CryptoData } from 'src/app/core/interfaces/interfaces';
import { FormsModule } from '@angular/forms';
import { NumberFormatPipe } from 'src/app/shared/number-format.pipe';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-buy-sell',
  standalone: true,
  imports: [CommonModule, NumberFormatPipe],
  templateUrl: './buy-sell.component.html',
  styleUrls: ['./buy-sell.component.scss']
})
export class BuySellComponent {

  public cryptoData: CryptoData[] = [];
  public searchText: string = ''; 

  constructor(private cryptoService: CryptoService, private cd: ChangeDetectorRef) { }

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
  

}
