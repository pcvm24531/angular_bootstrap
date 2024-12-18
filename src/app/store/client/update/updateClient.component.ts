import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { TitleComponent } from '../../../shared/components/title/title.component';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ClientService } from '../../../core/service/client.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-update-client',
  standalone: true,
  imports: [TitleComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './updateClient.component.html',
  styleUrl: './updateClient.component.css'
})
export class UpdateClientComponent {
  updateClientForm: FormGroup;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  @Output() clientUpdated = new EventEmitter<string>();

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private dialogRef: MatDialogRef<UpdateClientComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any//Datos del cliente enviados desde el componente padre
  ){
    //Inicializamos el formulario con los datos recibidos
    this.updateClientForm = this.fb.group( {
      name: [data.name,[Validators.required]],
      lastname: [data.lastname,[Validators.required]],
      ci: [data.ci,[Validators.required, Validators.pattern('^[0-9]{10}$')]],
    } );
  }

  updateClient(): void{
  
    if( this.updateClientForm.valid ){
      this.isLoading = true;
      const formData = this.updateClientForm.value
      this.clientService.updateClient(this.data._id, formData).subscribe(
        {
          next: (response)=>{
            //this.snackBar.open('Cliente actualizado con éxito', 'Cerrar', {duration: 3000}),
            this.close();
            this.isLoading = false;
            this.clientUpdated.emit('clientUpdated');
          },
          error: (err) => {
            console.error('Error al actualizar el cliente', err);
            //this.snackBar.open('Error al actuaizar el registro', 'Cerrar', {duration: 3000});
            this.isLoading = false;
          }
        }
      );
    }else{
      console.log('Formulario invalido, revisa los campos');
      this.isLoading = false;
    }
  }

  close(): void{
    this.dialogRef.close();
  }
}
