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
      .then(m => m.DashboardComponent)   
  } ,  
  {
    path: 'userProfile',
    loadComponent: () => import('./features/components/user-profile/user-profile.component')
      .then(m => m.UserProfileComponent),
      canActivate: [AuthGuard]

   
  } ,
  {
    path: 'buySell',
    loadComponent: () => import('./features/components/buy-sell/buy-sell.component')
      .then(m => m.BuySellComponent),
      canActivate: [AuthGuard]
   
  } ,
  {
    path: 'wallet',
    loadComponent: () => import('./features/components/wallet/wallet.component')
      .then(m => m.WalletComponent),
      canActivate: [AuthGuard]
   
  } , {
    path: 'history',
    loadComponent: () => import('./features/components/history/history.component')
      .then(m => m.HistoryComponent),
      canActivate: [AuthGuard]
   
  } ,
  { path: 'crypto/:id/history', component: CryptoHistoryComponent},
];


