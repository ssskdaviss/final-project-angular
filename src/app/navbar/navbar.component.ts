import {ChangeDetectionStrategy,ChangeDetectorRef,Component,OnInit} from '@angular/core';
import {MatDialog,MatDialogModule,MatDialogRef,} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { CreditCardComponent } from '../modals/credit-card/credit-card.component';
import { Router } from '@angular/router';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CryptoService } from '../shared/services/crypto.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../core/interfaces/interfaces';
import { NumberFormatPipe } from '../shared/pipes/number-format.pipe';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    CreditCardComponent,
    MatDialogModule,
    RouterLink,
    RouterOutlet,
    NumberFormatPipe
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit{
  user: User | null = null;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    public cryptoservices: CryptoService,
    private http: HttpClient,
    private changeDetectorRef: ChangeDetectorRef
  ) { }
  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.http.get<User>(`http://localhost:3000/users/${userId}`).subscribe(
        (user) => {
          this.user = user;
          this.changeDetectorRef.markForCheck();
          this.cryptoservices.updateUserBalance(user.balance);

        },
        (error) => {
          console.error('Failed to fetch user data:', error);
        }
      );
    }

  }
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
      this.router.navigate(['/home']);
    }
  }
  userIsLoggedIn(): boolean {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    return !!email && !!password;
  }
}
