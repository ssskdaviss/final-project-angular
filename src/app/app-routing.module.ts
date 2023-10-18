import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { CryptoHistoryComponent } from './features/components/crypto-history/crypto-history.component';

export const routes: Routes = [
  {
    path: '', 
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/components/login/login.component')
      .then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/components/register-form/register-form.component')
      .then(m => m.RegisterFormComponent)
  },
  {
    path: 'home',
    loadComponent: () => import('./features/components/home/home.component')
      .then(m => m.HomeComponent),
   
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/components/dashboard/dashboard.component')
      .then(m => m.DashboardComponent),
      canActivate: [AuthGuard]
   
  } , 
  { path: 'crypto/:id/history', component: CryptoHistoryComponent,canActivate: [AuthGuard]},

];


