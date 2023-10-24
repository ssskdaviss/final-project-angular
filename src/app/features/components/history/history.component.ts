import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoData, User, } from 'src/app/core/interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { NumberFormatPipe } from 'src/app/shared/pipes/number-format.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { CryptoService } from 'src/app/shared/services/crypto.service';
@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, NumberFormatPipe, NgxPaginationModule],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  user: User | null = null;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  public cryptoData: CryptoData[] = [];
  constructor(
    private http: HttpClient,
    private changeDetectorRef: ChangeDetectorRef,
    private cryptoService: CryptoService,
    private cd: ChangeDetectorRef

  ) { }

  ngOnInit(): void {
    this.fetchCryptoData()
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.http.get<User>(`http://localhost:3000/users/${userId}`).subscribe(
        (user) => {
          this.user = user;
          this.changeDetectorRef.markForCheck();
        },
        (error) => {
          console.error('Failed to fetch user data:', error);
        }
      );
    }
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

  public getCryptoLivePrice(id: string): number {
    let index = this.cryptoData.findIndex((object) => object.id === id)
    if (index === -1) return 0
    return this.cryptoData[index].priceUsd
  }


}

