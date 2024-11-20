import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const AuthenticatedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  //Verificamos si esta autenticado, redirigimos al dashboard
  if( authService.isAuthenticated() ){
    return router.navigate(['/dashboard']);
  }else{//
    return true;
  }
};
