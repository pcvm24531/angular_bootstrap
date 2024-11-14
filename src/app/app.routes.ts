import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: ()=>import('./shared/components/layout/layout.component'),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./store/dashboard/dashboard.component')
      },
      {
        path: 'profile',
        loadComponent: () => import('./store/dashboard/dashboard.component')
      },
      {
        path: 'tables',
        loadComponent: () => import('./store/dashboard/dashboard.component')
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
