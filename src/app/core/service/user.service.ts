import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from '../../../environmets'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private USER_URL = environment.BASE_URL+"user";

  constructor( private httpClient: HttpClient, private router: Router ) { }

  //Método que obtiene todos los usuarios
  getAllUsers(): Observable<any>{
    return this.httpClient.get<any>(this.USER_URL);
  }
}
