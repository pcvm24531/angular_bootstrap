import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';
import ProfileComponent from './store/profile/profile.component';
import SaleComponent from './store/sale/sale.component';
import { CreateClientComponent } from './store/client/create/createClient.component';
import UserComponent from './store/user/user.component';
import DashboardComponent from "./store/dashboard/dashboard.component";
import LayoutComponent from './shared/components/layout/layout.component';
import ClientComponent from './store/client/client.component';
import ProductComponent from './store/product/product.component';
import LoginComponent from './store/authentication/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'client',
        component: ClientComponent,
        canActivate: [AuthGuard],
        children:[
          {
            path: 'create',
            component: CreateClientComponent,
            canActivate: [AuthGuard]
          }
        ],
      },
      {
        path: 'product',
        component: ProductComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'user',
        component: UserComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'sale',
        component: SaleComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'profile',
        component: ProfileComponent,
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
    component: LoginComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path:'**',
    redirectTo:'dashboard'
  }
];
