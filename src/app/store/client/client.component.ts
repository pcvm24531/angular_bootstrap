import { Component, OnInit, ViewChild } from '@angular/core';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ClientService } from '../../core/service/client.service';
import { TitleComponent } from '../../shared/components/title/title.component';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { CreateClientComponent } from './create/createClient.component';
import { UpdateClientComponent } from './update/updateClient.component';
import { ReadClientComponent } from './read/readClient.component';
import { DeleteClientComponent } from './delete/deleteClient.component';

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
  @ViewChild('CreateClientComponent') CreateClientComponent: any;

  //Cargamos el servicio
  constructor(private clienService: ClientService, private dialog: MatDialog){}

  ngOnInit(): void {
    this.fetchClients();
  }

  //Obtenemos la lista de clientes
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
    const dialogReg = this.dialog.open(CreateClientComponent, {
      width: '768px',
      disableClose: true
    });
    dialogReg.componentInstance.clientAdded.subscribe( (event: string)=>{
      if (event==='clientAdded') {
        this.fetchClients();
      }
    });
  }

  updateClient(event: MouseEvent, client: any ): void{
    const dialogEdit = this.dialog.open(UpdateClientComponent, {
      width: '768px',
      disableClose: true,
      data:client
    });
    dialogEdit.componentInstance.clientUpdated.subscribe( (event: string)=>{
      if( event==='clientUpdated' ){
        this.fetchClients();
      }
    });
  }

  readClient( client: any ){
    const dialogRead = this.dialog.open( ReadClientComponent,{
      width: '780px',
      disableClose: true,
      data: client
    } );
    dialogRead.componentInstance.clientRead.subscribe( (event: string)=>{
      if( event === 'clientRead'){
        this.fetchClients();
      }
    } );
  }

  //Eliminamos el cliente
  confirmDelete(client: any): void{
    const dialogDelete = this.dialog.open( DeleteClientComponent, {
      width: '400px',
      data:{
        title:'Eliminar CLiente',
        message:`¿Está seguro que quiere eliminar a ${client.name} ${client.lastname}?`
      }
    } );
    dialogDelete.afterClosed().subscribe( result=>{
      if(result){
        this.deleteClient(client.id);
      }
    } );
  }
  deleteClient(id: string): void{
    this.clienService.deleteClient(id).subscribe({
      next: ()=>{
        this.clients = this.clients.filter(client=>client!==id)
      },
      error:(err)=>{
        console.log(`Error al eliminar al cliente`);
      }
    });
  }
}
