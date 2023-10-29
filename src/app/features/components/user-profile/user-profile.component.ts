import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/core/interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { NumberFormatPipe } from 'src/app/shared/pipes/number-format.pipe';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, NumberFormatPipe],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class UserProfileComponent implements OnInit {
  public user: User | null = null;

  constructor(
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
        },
        (error) => {
          console.error('Failed to fetch user data:', error);
        }
      );
    }
  }
}
