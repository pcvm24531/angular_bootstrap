import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environmets';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private CLIENT_URL = environment.BASE_URL+'client';

  constructor(private httpClient: HttpClient, private Router: Router) { }

  //Función que obtiene la lista de clientes
  getAllClients(): Observable<any>{
    return this.httpClient.get<any>(this.CLIENT_URL);
  }
}
