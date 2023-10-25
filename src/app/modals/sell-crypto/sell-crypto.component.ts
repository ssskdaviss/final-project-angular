import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnInit, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, } from '@angular/forms';
import { User } from 'src/app/core/interfaces/interfaces';
import { NumberFormatPipe, StringToNumberPipe, } from '../../shared/pipes/number-format.pipe';
import { HttpClient } from '@angular/common/http';
import { CryptoService } from 'src/app/shared/services/crypto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sell-crypto',
  standalone: true,
  templateUrl: './sell-crypto.component.html',
  styleUrls: ['./sell-crypto.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NumberFormatPipe,
    FormsModule,
    StringToNumberPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SellCryptoComponent implements OnInit {
  userBalance!: number;
  usdAmount!: number;
  livePrice: number = 0;

  sellForm: FormGroup;
  @Input() data!: { id: string; cryptoAmount: number };
  cryptoAmount: string = '10';
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public crypto: { id: string; cryptoAmount: number },
    private fb: FormBuilder,
    private http: HttpClient,
    private cryptoService: CryptoService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private dialogRef: MatDialogRef<SellCryptoComponent> //close modal
  ) {
    this.sellForm = this.fb.group({
      cryptoAmount: [''],
      usd: [''],
    });
    this.getBalance();
  }
  ngOnInit(): void {
    this.cryptoService.fetchCryptoData().subscribe(
      (response) => {
        let arrIndex = response.data.findIndex(
          (object) => object.id === this.crypto.id
        );
        if (arrIndex === -1) {
          alert('Something went wrong');
          return;
        }
        this.livePrice = response.data[arrIndex].priceUsd;
        this.cd.markForCheck();
      },
      (error) => {
        console.error('Error in fetchCryptoData:', error);
      }
    );
  }

  public getBalance() {
    if (this.sellForm.valid) {
      const userId = localStorage.getItem('userId');
      this.http
        .get<User>(`http://localhost:3000/users/${userId}`, {})
        .subscribe((user: User) => {
          this.sellForm.reset();
          this.userBalance = user.balance;
          this.cd.markForCheck();
        });
    }
  }

  public onSubmit(): void {
    if (this.sellForm.valid) {
      const userId = localStorage.getItem('userId');
      this.http
        .get<User>(`http://localhost:3000/users/${userId}`, {})
        .subscribe((user: User) => {
          let cryptoArr = user.crypto;
          let cryptoIndex = cryptoArr.findIndex(
            (object) => object.id === this.crypto.id
          );

          if (cryptoArr[cryptoIndex].cryptoAmount < Number(this.cryptoAmount)) {
            alert('Not enough crypto on the account');
            return;
          }

          cryptoArr[cryptoIndex].cryptoAmount -= Number(this.cryptoAmount);

          let history = user.history;

          history.unshift({
            id: this.crypto.id,
            type: 'sell',
            amount: Number(this.cryptoAmount),
            priceUsd: this.livePrice * Number(this.cryptoAmount),
          });

            // Update balance in the service
          const newBalance = user.balance + this.livePrice * Number(this.cryptoAmount);
          this.cryptoService.updateUserBalance(newBalance);

          this.http
            .patch<User>(`http://localhost:3000/users/${userId}`, {
              crypto: cryptoArr,
              balance:
                user.balance + this.livePrice * Number(this.cryptoAmount),
              history: history,
            })
            .subscribe((user: User) => {
              console.log('Crypto updated:', user);
              this.sellForm.reset();
              this.cd.markForCheck();
              this.dialogRef.close();
            });
        });
    }
    this.router.navigateByUrl('/buySell', { skipLocationChange: true }).then(() => {
      this.router.navigate(["/wallet"])
    })
  }
  // closeSellModal(): void {
  //   this.dialogRef.close();
  // }
}
