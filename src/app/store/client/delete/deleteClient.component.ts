import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { ClientService } from '../../../core/service/client.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TitleComponent } from "../../../shared/components/title/title.component";
import { ButtonComponent } from "../../../shared/components/button/button.component";

@Component({
  selector: 'app-delete-client',
  standalone: true,
  imports: [TitleComponent, ButtonComponent],
  templateUrl: './deleteClient.component.html',
  styleUrl: './deleteClient.component.css'
})
export class DeleteClientComponent  {
  clientData: any = null;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  @Output() clientDeleted = new EventEmitter<string>();

  constructor(
    private clientService: ClientService,
    private dialogRef: MatDialogRef<DeleteClientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }



  deletedClient(): void {
    this.isLoading = true;
    this.clientService.deleteClient(this.data._id).subscribe({
      next: (response) => {
        this.close();
        this.isLoading = false;
        this.clientDeleted.emit('clientDeleted');
      },
      error: (err) => {
        console.log(`Error al eliminar el cliente, ${err}`);
        this.errorMessage = "No se pudo eliminar el cliente";
        this.isLoading = false;
      }
    });
  }

  close(): void{
    this.dialogRef.close();
  }
}
