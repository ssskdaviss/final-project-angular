import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User, } from 'src/app/core/interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { NumberFormatPipe } from 'src/app/shared/number-format.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private http: HttpClient,
    private changeDetectorRef: ChangeDetectorRef,
    private route: ActivatedRoute

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

