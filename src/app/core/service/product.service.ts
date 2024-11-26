import { Injectable } from '@angular/core';
import { environment } from '../../../environmets';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private PRODUCT_URL = environment.BASE_URL+"product";

  constructor(private httpClient: HttpClient, private router: Router) { }

  //Método que obtiene la lista de productos
  getAllProducts(): Observable<any>{
    return this.httpClient.get<any>(this.PRODUCT_URL);
  }
}
