import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: ()=>import('./shared/components/layout/layout.component'),//Importamos el componente principal(global)
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./store/dashboard/dashboard.component'),
        canActivate: [AuthGuard]
      },
      {
        path: 'client',
        loadComponent: ()=>import('./store/client/client.component'),
        canActivate: [AuthGuard]
      },
      {
        path: 'product',
        loadComponent: ()=>import('./store/product/product.component'),
        canActivate: [AuthGuard]
      },
      {
        path: 'user',
        loadComponent: ()=>import('./store/user/user.component'),
        canActivate: [AuthGuard]
      },
      {
        path: 'sale',
        loadComponent:()=>import('./store/sale/sale.component'),
        canActivate: [AuthGuard]
      },
      {
        path: 'profile',
        loadComponent:()=>import('./store/profile/profile.component'),
        canActivate: [AuthGuard]
      },
      {
        path:'',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'login',
    loadComponent: ()=>import('./store/authentication/login/login.component'),
    canActivate: [AuthenticatedGuard]
  },
  {
    path:'**',
    redirectTo:'dashboard'
  }
];
