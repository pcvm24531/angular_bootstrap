import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: ()=>import('./shared/components/layout/layout.component'),//Importamos el componente principal(global)
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./store/dashboard/dashboard.component')
      },
      {
        path: 'client',
        loadComponent: ()=>import('./store/client/client.component')
      },
      {
        path: 'product',
        loadComponent: ()=>import('./store/product/product.component')
      },
      {
        path: 'user',
        loadComponent: ()=>import('./store/user/user.component')
      },
      {
        path: 'sale',
        loadComponent:()=>import('./store/sale/sale.component')
      },
      {
        path: 'profile',
        loadComponent:()=>import('./store/profile/profile.component')
      },
      {
        path:'',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path:'**',
    redirectTo:'dashboard'
  }
];
