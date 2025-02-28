import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { TitleComponent } from "../../../shared/components/title/title.component";
import { ClientService } from '../../../core/service/client.service';
import { SpinnerComponent } from "../../../shared/components/spinner/spinner.component";

@Component({
  selector: 'app-create-client',
  standalone: true,
  imports: [ButtonComponent, TitleComponent, ReactiveFormsModule, SpinnerComponent],
  templateUrl: './createClient.component.html',
  styleUrl: './createClient.component.css'
})
export class CreateClientComponent {

  createClientForm: FormGroup = new FormGroup({
    name: new FormControl(
      '',
      [Validators.required]
    ),
    lastname: new FormControl(
      '',
      [Validators.required]
    ),
    ci: new FormControl(
      '',
      [
        Validators.required,
        Validators.pattern('^[0-9]{7}'),
        Validators.minLength(5),
        Validators.maxLength(10)
      ]
    )
  });

  isLoading: boolean = false;
  errorMessage: string | null = null;

  //Output
  @Output() clientAdded = new EventEmitter<string>();

  constructor ( private clientService: ClientService, private fb: FormBuilder, private dialogRef: MatDialogRef<CreateClientComponent>){}


  valuesClientsForm: any;


  saveClient(): void {
    this.valuesClientsForm = this.createClientForm.value;
    //Verificamos si se ha validado correctamente
    if( this.createClientForm.valid ){
      //Activamos indicador de carga
      this.isLoading = true;
      //Capturar datos de carga
      const formData = this.createClientForm.value;

      //llamada al serivicio para enviar el POST
      this.clientService.saveClient(formData).subscribe(
        {
          next: (response) => {
            this.close();
            this.createClientForm.reset();
            this.isLoading = false;
            this.clientAdded.emit('clientAdded');//Notificamos al componente padre
          },
          error: (error) => {
            console.log('Error al cuardar el cliente ',error);
            this.isLoading = false;
          }
        }
      );
    }else{
      console.log('Formulario inválido, por favor revisa los campos');
      this.isLoading = false;
    }
  }

  close(): void{
    this.dialogRef.close();
  }

}
