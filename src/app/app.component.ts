import { Component } from '@angular/core';
import {  RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
@Component({
  standalone: true,
  imports: [RouterOutlet,RouterLink,NavbarComponent,],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  constructor() { }

}
