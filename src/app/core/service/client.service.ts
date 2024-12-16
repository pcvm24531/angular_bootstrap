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
  //Funcion que obtiene un cliente
  getClient(id: string): Observable<any>{
    return this.httpClient.get<any>( `${this.CLIENT_URL}/id:${id}`);
  }

  //Función que obtiene la lista de clientes
  getAllClients(): Observable<any>{
    return this.httpClient.get<any>(this.CLIENT_URL);
  }

  //Funcion que envia datos al backent
  saveClient(newClient: any): Observable<any>{
    return this.httpClient.post( this.CLIENT_URL, newClient );
  }

  //Actualizamos los datos del cliente
  updateClient(id: string, dataClient: any): Observable<any>{
    return this.httpClient.put( `${this.CLIENT_URL}/${id}`, dataClient );
  }
}
