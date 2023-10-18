import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoService } from 'src/app/services/crypto.service';
import { CryptoData } from 'src/app/core/interfaces/interfaces';
import { FormsModule } from '@angular/forms';
import { NumberFormatPipe } from 'src/app/shared/number-format.pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,FormsModule,NumberFormatPipe ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class DashboardComponent {
  cryptoData: CryptoData[] = [];
  searchText: string = ''; 
  currentPage: number = 1;
  itemsPerPage: number = 10;

  constructor(private cryptoService: CryptoService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.fetchCryptoData();
  }

  fetchCryptoData() {
    this.cryptoService.fetchCryptoData().subscribe((response) => {
      this.cryptoData = response.data;
      this.cd.markForCheck(); 

    });
  }
  get paginatedCryptoData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.cryptoData.slice(startIndex, endIndex);
  }
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    const totalPages = Math.ceil(this.cryptoData.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  }
}
