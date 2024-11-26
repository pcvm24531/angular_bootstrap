import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ClientService } from '../../core/service/client.service';
import { TitleComponent } from '../../shared/components/title/title.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule, ButtonComponent, TitleComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export default class ClientComponent implements OnInit {
  clients: any[] = [];
  loading: boolean = false;
  errorMessage: String = '';

  //Cargamos el servicio
  constructor(private clienService: ClientService){}

  ngOnInit(): void {
    this.fetchClients();
  }

  fetchClients(): void{
    this.loading = true;
    this.clienService.getAllClients().subscribe({
      next: (response)=>{
        this.clients = response;
        this.loading = false;
      },
      error: (error)=>{
        this.errorMessage = 'No se pudo cargar los clientes';
        this.loading = false;
      }
    });
  }

  addClient(event: MouseEvent): void{
    console.log('Agregar nuevo cliente');
  }
}
