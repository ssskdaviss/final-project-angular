import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
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
      .then(m => m.HomeComponent)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
