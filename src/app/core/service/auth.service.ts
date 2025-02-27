import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environmets';

@Injectable({
  providedIn: 'root'//Permitimos que el servicio sea accesible en toda la aplicación
})
export class AuthService {
  private LOGIN_URL= environment.BASE_URL+"login";
  private tokenkey = 'tokenJS';
  private userData = new BehaviorSubject<any>(null);

  constructor( private httpClient: HttpClient, private router: Router) { }

  //Metodo que se encarga de obtener datos del backend
  login(username: string, password:string): Observable<any> {
    return this.httpClient.post<any>(this.LOGIN_URL, {username, password}).pipe(
      tap(response => {
        if( response.token ){
          this.setToken(response.token);
        }
      })
    );
  }

  //Metodo que almacena el token en el localstorage
  private setToken(token: string): void{
    localStorage.setItem( this.tokenkey, token);
  }

  //recuperamos el token de localstorage
  private getToken(): string | null{
    return localStorage.getItem(this.tokenkey);
  }

  //Observable para que los componentes puedan suscribirse a los cambios
  userData$ = this.userData.asObservable();

  //Método para actualizar los datos del usuario
  setUserData(data: any){
    this.userData.next(data);
  }
  //Método para obtener los datos actuales del usuario
  getUserData(){
    return this.userData.getValue();
  }

  getUserId(){
    const token = this.getToken();
    if (!token) {return null;}
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id;
  }

  //verificamos si esta autenticado/validar tiempo de validez/si el token existe en el ocalstorage
  isAuthenticated(): boolean{
    const token = this.getToken();
    if (!token) {
      //this.logout();
      return false;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp*1000;//Para comvertir en milisegundo

    //Verificamos si el token ha expirado
    if( Date.now() > exp ){
      //this.logout();
      return false;
    }

    //Verificamos inactividad
    const lastActivity = localStorage.getItem('lastActivity');
    const inactivityLimit = 30*60*1000;//30 minutos
    if(lastActivity){
      const timeSinceLasrActivity = Date.now() - Number(lastActivity);

      //Si el usuario esta inactivo por más de 30 min
      if(timeSinceLasrActivity > inactivityLimit){console.log('inactivooooo');
        this.logout();
        return false;
      }
    }

    //Actualizamos la última actividad
    localStorage.setItem('lastActivity', Date.now().toString());
    return true;
  }

  //Cerrar sesion
  logout(): void{
    localStorage.removeItem(this.tokenkey);
    localStorage.removeItem('lastActivity');
    this.setUserData(null);
    this.router.navigate(['/login']);
  }

  //
}
