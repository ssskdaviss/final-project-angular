import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from 'src/app/core/interfaces/interfaces';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
    if (localStorage.getItem('email')) {
      this.router.navigate(['/home'])
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.http.get<User[]>('http://localhost:3000/users').subscribe(
        (users: User[]) => {
          const authenticatedUser = users.find(
            (user) =>
              user.email === loginData.email &&
              user.password === loginData.password
          );
          if (authenticatedUser) {
            console.log('Login successful:', authenticatedUser);
            localStorage.setItem('email', authenticatedUser.email);
            localStorage.setItem('password', authenticatedUser.password);
            localStorage.setItem('userId', authenticatedUser.id);
            this.cdr.markForCheck();
            window.location.href = "/home"
          } else {
            alert('Login failed: Invalid credentials');
          }
        },
        (error) => {
          console.error('Login failed:', error);
        }
      );
    }
  }
}
