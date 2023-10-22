import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { CreditCardComponent } from '../modals/credit-card/credit-card.component';
import { Router } from '@angular/router';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CryptoService } from '../services/crypto.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    CreditCardComponent,
    MatDialogModule,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  constructor(public dialog: MatDialog, private router: Router,public cryptoservices: CryptoService
    ) {}
  dialogRef!: MatDialogRef<CreditCardComponent>;
  openCardModal(): void {
    this.dialogRef = this.dialog.open(CreditCardComponent, {});

    this.dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  closeCardModal(): void {
    this.dialogRef.close();
  }

  logout(): void {
    const confirmLogout = window.confirm('Are you sure you want to Log Out?');

    if (confirmLogout) {
      localStorage.removeItem('email');
      localStorage.removeItem('password');
      localStorage.removeItem('userId');
      this.router.navigate(['/login']);
      location.reload(); 

    }
  }
}
