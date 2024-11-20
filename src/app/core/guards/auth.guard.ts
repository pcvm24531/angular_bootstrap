import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { inject } from '@angular/core';

//Verificamos si esta authenticado para cuidar las rutas de nuestros componentes
export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  //verificamos si esta authenticado
  if( authService.isAuthenticated() ){
    return true;
  }else{//Si no esta aunthenticado enviamos al login
    return router.navigate(['/login']);
  }
};
