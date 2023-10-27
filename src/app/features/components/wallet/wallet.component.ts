import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CryptoData, User } from 'src/app/core/interfaces/interfaces';
import { SellCryptoComponent } from '../../modals/sell-crypto/sell-crypto.component';
import { NumberFormatPipe } from 'src/app/shared/pipes/number-format.pipe';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { CryptoService } from 'src/app/shared/services/crypto.service';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [CommonModule, NumberFormatPipe, SellCryptoComponent],
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletComponent implements OnInit {
  public cryptoData: CryptoData[] = [];
  livePrice: number = 0;
  user: User | null = null;
  public searchText: string = '';
  constructor(
    private http: HttpClient,
    private changeDetectorRef: ChangeDetectorRef,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private router: Router,
    private cryptoService: CryptoService
  ) { }

  ngOnInit(): void {
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

  public dialogRef!: MatDialogRef<SellCryptoComponent>;
  public openSellModal(crypto: { id: string; cryptoAmount: number }): void {
    this.dialogRef = this.dialog.open(SellCryptoComponent, {
      data: {
        id: crypto.id,
        cryptoAmount: crypto.cryptoAmount,
      },
    });

    this.dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }


    //sell all crypto
    public sellCrypto(id: string, amount: number): void {
      let index = this.cryptoData.findIndex((object) => object.id === id);
      if (index === -1) return;
      this.livePrice = this.cryptoData[index].priceUsd;
    
      const userId = localStorage.getItem('userId');
      this.http
        .get<User>(`http://localhost:3000/users/${userId}`, {})
        .subscribe((user: User) => {
          let cryptoArr = user.crypto;
          let cryptoIndex = cryptoArr.findIndex((object) => object.id === id);
    
          cryptoArr.splice(cryptoIndex, 1);
    
          let history = user.history;
    
          history.unshift({
            id: id,
            type: 'sell',
            amount: amount,
            priceUsd: this.livePrice * amount,
          });
    
          this.http
            .patch<User>(`http://localhost:3000/users/${userId}`, {
              crypto: cryptoArr,
              balance: user.balance + this.livePrice * Number(amount),
              history: history,
            })
            .subscribe((user: User) => {
              this.http.get<User>(`http://localhost:3000/users/${userId}`).subscribe(
                (updatedUser) => {
                  const newBalance = updatedUser.balance;
    
                  this.cryptoService.updateUserBalance(newBalance);
    
                  console.log('Crypto updated:', updatedUser);
                  this.cd.markForCheck();
                },
                (error) => {
                  console.error('Failed to fetch updated user data:', error);
                }
              );
            });
        });
    
      this.router
        .navigateByUrl('/buySell', { skipLocationChange: true })
        .then(() => {
          this.router.navigate(['/wallet']);
        });
    }
}
