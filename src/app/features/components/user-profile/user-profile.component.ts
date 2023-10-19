import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/core/interfaces/interfaces';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit{
  
  user: User | null = null;

  constructor(private http: HttpClient) {}
  
  ngOnInit(): void {
     const userId = localStorage.getItem('userId');
     if (userId) {
       this.http.get<User>(`http://localhost:3000/users/${userId}`).subscribe(
         (user) => {
           this.user = user;
         },
         (error) => {
           console.error('Failed to fetch user data:', error);
         }
       );
     }
  }





}
