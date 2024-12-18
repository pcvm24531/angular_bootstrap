import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/service/product.service';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { TitleComponent } from '../../shared/components/title/title.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ButtonComponent, TitleComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export default class ProductComponent implements OnInit{
  products: any[] = [];//Contiene lista de productos
  loading: boolean = true;
  errorMessage: String | null = null;

  constructor( private productService: ProductService){}

  ngOnInit(): void {
    this.fetchProducts();
  }

  //Función que obtiene la lista de productos
  fetchProducts(): void{
    this.loading = true;
    this.productService.getAllProducts().subscribe({
      next: (response)=>{
        this.products = response.result,
        this.loading = false;
      },
      error: (error)=>{
        this.errorMessage = 'No se pudo cargar los productos';
        this.loading = false;
      }
    });
  }

  //Funcón que agrega un nuevo producto
  addProduct(event: MouseEvent): void{
    console.log('Carga Modal');

  }
}
