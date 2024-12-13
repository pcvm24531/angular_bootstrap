import { Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { TitleComponent } from '../../../shared/components/title/title.component';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ClientService } from "../../../core/service/client.service";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-client',
  standalone: true,
  imports: [TitleComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './updateClient.component.html',
  styleUrl: './updateClient.component.css'
})
export class UpdateClientComponent {

  constructor(
    private cLientService: ClientService,
    private formBuilder: FormBuilder,
    private dialogEdit: MatDialogRef<UpdateClientComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}

  updateClientForm: FormGroup = new FormGroup({
    name: new FormControl(
      'data.name',
      [Validators.required]
    ),
    lastname: new FormControl(
      'data.lastname',
      [Validators.required]
    ),
    ci: new FormControl(
      'data.ci',
      [
        Validators.required,
        Validators.pattern('^[0-9]{10}'),
        Validators.minLength(5),
        Validators.maxLength(10)
      ]
    )
  });

  @Input() clientData: any = null;
  @Output() clientSaved = new EventEmitter<void>();

  updateClient():void{
    if( this.updateClientForm.valid ){
      this.cLientService.updateClient(this.data.id, this.updateClientForm).subscribe(
        {
          next: (response) => {
            this.snackBar.open('Cliente actualizado con éxito.', 'Cerrar', {duration: 300});
            this.clientSaved.emit();
            this.dialogEdit.close(response);
          },
          error: (error) => {
            console.log('Error al actualizar al cliente', error);
            this.snackBar.open('Error al actualizar el cliente. Inténtalo de nuevo', 'Cerrar', {duration: 3000});
          }
        }
      );
    }else{
      this.snackBar.open('Todos los campos son requeridos!', 'Cerrar', {duration: 3000});
    }
  }

  close(): void{
    this.dialogEdit.close();
  }

}
