import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class LogoutComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.logout();
  }

  logout(): void {
    localStorage.removeItem('email');
    localStorage.removeItem('password');

    this.router.navigate(['/login']);
  }
}

