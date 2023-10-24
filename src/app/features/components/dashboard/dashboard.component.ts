import { ChangeDetectionStrategy, ChangeDetectorRef, Component, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { CryptoData } from 'src/app/core/interfaces/interfaces';
import { FormsModule } from '@angular/forms';
import { NumberFormatPipe } from 'src/app/shared/pipes/number-format.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, NumberFormatPipe, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  public cryptoData: CryptoData[] = [];
  public searchText: string = '';
  public currentPage: number = 1;
  public itemsPerPage: number = 10;

  constructor(
    private cryptoService: CryptoService,
    private cd: ChangeDetectorRef
  ) { }

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

  get paginatedCryptoData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.cryptoData.slice(startIndex, endIndex);
  }

  public previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  public nextPage() {
    const totalPages = Math.ceil(this.cryptoData.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  }
}
