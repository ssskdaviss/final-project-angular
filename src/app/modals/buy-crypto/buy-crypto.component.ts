import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { User, cryptoInterface } from 'src/app/core/interfaces/interfaces';
import {
  NumberFormatPipe,
  StringToNumberPipe,
} from '../../shared/number-format.pipe';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-buy-crypto',
  standalone: true,
  templateUrl: './buy-crypto.component.html',
  styleUrls: ['./buy-crypto.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NumberFormatPipe,
    FormsModule,
    StringToNumberPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuyCryptoComponent {
  userBalance!: number;
  cryptoAmount!: number;

  buyForm: FormGroup;
  @Input() data!: cryptoInterface;
  usdAmount: string = '10';
  constructor(
    @Inject(MAT_DIALOG_DATA) public crypto: cryptoInterface,
    private fb: FormBuilder,
    private http: HttpClient,
    private cd: ChangeDetectorRef,
    private dialogRef: MatDialogRef<BuyCryptoComponent> //close modal
  ) {
    this.buyForm = this.fb.group({
      usdAmount: [''],
      usd: ['' /*aq validacia*/],
    });
    this.getBalance();
  }

  public getBalance() {
    if (this.buyForm.valid) {
      const userId = localStorage.getItem('userId');
      this.http
        .get<User>(`http://localhost:3000/users/${userId}`, {})
        .subscribe((user: User) => {
          this.buyForm.reset();
          this.userBalance = user.balance;
          this.cd.markForCheck();
        });
    }
  }

  public onSubmit(): void {
    if (this.buyForm.valid) {
      const userId = localStorage.getItem('userId');

      this.http
        .get<User>(`http://localhost:3000/users/${userId}`, {})
        .subscribe((user: User) => {
          if (!(Number(this.usdAmount) <= Number(user.balance))) {
            alert('Not enough money');
            return;
          }
          let cryptoArr = user.crypto;
          if (
            cryptoArr.findIndex((object) => object.id === this.crypto.id) === -1
          ) {
            cryptoArr.push({
              id: this.crypto.id,
              cryptoAmount: Number(this.usdAmount) / this.crypto.priceUsd,
            });
          } else {
            cryptoArr[
              cryptoArr.findIndex((object) => object.id === this.crypto.id)
            ].cryptoAmount += Number(this.usdAmount) / this.crypto.priceUsd;
          }

          this.http
            .patch<User>(`http://localhost:3000/users/${userId}`, {
              crypto: cryptoArr,
              balance: user.balance - Number(this.usdAmount),
            })
            .subscribe((user: User) => {
              console.log('Crypto updated:', user);
              this.buyForm.reset();
              this.cd.markForCheck();
              this.dialogRef.close();
            });
        });
    }
  }
}
