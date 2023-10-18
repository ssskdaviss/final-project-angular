import { Component } from '@angular/core';
import {  Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';

@Component({
  standalone: true,
  imports: [RouterOutlet,RouterLink,],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router) { }

  logout(): void {
    const confirmLogout = window.confirm('Are you sure you want to Log Out?');

  if (confirmLogout) {
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    this.router.navigate(['/login']);
  }}
}
