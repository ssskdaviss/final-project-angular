import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/core/interfaces/interfaces';
import { FormControl } from '@angular/forms';
import { ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-credit-card',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreditCardComponent {
  cardInfoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private dialogRef: MatDialogRef<CreditCardComponent> //close modal
  ) {

    this.cardInfoForm = this.fb.group({
      cardNumber: ['', [Validators.required, this.cardNumberValidator]],
      expirationDate: ['', [Validators.required, this.expirationDateValidator],
      ],
      cvc: ['', [Validators.required, this.cvcValidator]],
    });
  }

  public onSubmit(): void {
    if (this.cardInfoForm.valid) {
      const cardInfoData = this.cardInfoForm.value;
      const userId = localStorage.getItem('userId');

      this.http
        .patch<User>(`http://localhost:3000/users/${userId}`, {
          cardInfo: cardInfoData,
          balance: 500 + Math.floor(Math.random() * 1500),
        })
        .subscribe((user: User) => {
          console.log('Card info updated:', user);
          this.cardInfoForm.reset();
          this.dialogRef.close();
          this.router.navigate(['/userProfile']);
        });
    }
  }

  public cardNumberValidator(control: FormControl) {
    const cardNumber = control.value;
    const regexPattern = /^\d{16}$/;
    if (!regexPattern.test(cardNumber)) {
      return { invalidCardNumber: true };
    }
    return null;
  }

  public expirationDateValidator(control: FormControl) {
    const expirationDate = control.value;
    const regexPattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!regexPattern.test(expirationDate)) {
      return { invalidExpirationDate: true };
    }
    return null;
  }

  public cvcValidator(control: FormControl) {
    const cvc = control.value;
    const regexPattern = /^\d{3}$/;
    if (!regexPattern.test(cvc)) {
      return { invalidCVC: true };
    }
    return null;
  }
  closeCardModal(): void {
    this.dialogRef.close();
  }
}
