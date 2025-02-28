import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { ClientService } from '../../../core/service/client.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TitleComponent } from "../../../shared/components/title/title.component";
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { SpinnerComponent } from "../../../shared/components/spinner/spinner.component";

@Component({
  selector: 'app-read-client',
  standalone: true,
  imports: [TitleComponent, ButtonComponent, SpinnerComponent],
  templateUrl: './readClient.component.html',
  styleUrl: './readClient.component.css'
})
export class ReadClientComponent implements OnInit {

  clientData: any = null;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  @Output() clientRead = new EventEmitter<string>();

  constructor(
    private clientService: ClientService,
    private dialogRef: MatDialogRef<ReadClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any//Cargamos los datos del cliente por injection de dependencia
  ){}

  ngOnInit(): void {
    this.readClient();
  }

  readClient(): void{
    if( this.data ){
      //Si los datos están inyectados
      this.clientData = this.data;
    }else{
      //cargamos los datos desde un servicio
      this.isLoading = true;
      this.clientService.getClient(this.data.id).subscribe(
        {
          next: (response)=>{
            this.clientData = response;
            this.isLoading = false;
            this.clientRead.emit('clientRead');
          },
          error:(err)=>{
            console.log(`Error al cargar los datos del cliente, ${err}`);
            this.errorMessage = "No se pudo cargar los datos del cliente";
            this.isLoading = false;
          }
        }
      );
    }
  }

  close(): void{
    this.dialogRef.close();
  }

}
