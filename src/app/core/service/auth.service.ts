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
        console.log('Response:', response);
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

  //verificamos si esta autenticado/validar tiempo de validez/si el token existe en el ocalstorage
  isAuthenticated(): boolean{
    const token = this.getToken();
    if (!token) {
      return false;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;//Para comvertir en milisegundo
    return Date.now() < exp;
  }

  //Cerrar sesion
  logout(): void{
    localStorage.removeItem(this.tokenkey);
    this.router.navigate(['/login']);
  }

  //
}
