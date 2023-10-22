import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/core/interfaces/interfaces';
import { SellCryptoComponent } from 'src/app/modals/sell-crypto/sell-crypto.component';
import { NumberFormatPipe } from 'src/app/shared/number-format.pipe';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [CommonModule, NumberFormatPipe, SellCryptoComponent],
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletComponent implements OnInit {
  user: User | null = null;
  public searchText: string = '';
  constructor(
    private http: HttpClient,
    private changeDetectorRef: ChangeDetectorRef,
    public dialog: MatDialog,

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
  }



  dialogRef!: MatDialogRef<SellCryptoComponent>;
  openSellModal(crypto: { id: string; cryptoAmount: number }): void {
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
}
