import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { TitleComponent } from "../../../shared/components/title/title.component";
import { ClientService } from '../../../core/service/client.service';

@Component({
  selector: 'app-create-client',
  standalone: true,
  imports: [ButtonComponent, TitleComponent, ReactiveFormsModule],
  templateUrl: './createClient.component.html',
  styleUrl: './createClient.component.css'
})
export class CreateClientComponent {

  createClientForm!: FormGroup<any>;
  isSubmitting: boolean = false;
  errorMessage: string | null = null;

  constructor ( private clientService: ClientService, private fb: FormBuilder, private dialogRef: MatDialogRef<CreateClientComponent>){}


  ngOnInit(): void{
    this.createClientForm = this.fb.group({
      name: ['',[Validators.required]], // Campo obligatorio
      lastname: ['',[Validators.required]], // Campo obligatorio
      ci: ['',[Validators.required, Validators.pattern('^[0-9]{10}[A-Z]{3}')]] // Solo números
    });
  }


  saveClient(): void {
    console.log(this.createClientForm);
    if (this.createClientForm && this.createClientForm.valid) {

      const formData = this.createClientForm.value;
      // Llamada al servicio para enviar los datos por POST
      this.clientService.saveClient(formData).subscribe({
        next: (response) => {
          console.log('Cliente guardado con éxito:', response);
          //Limpiamos el formulario
          this.createClientForm.reset();
        },
        error: (error) => {
          console.error('Error al guardar el cliente:', error);
        },
      });
    } else {
      console.warn('Formulario inválido');
    }
  }

  close(): void{
    this.dialogRef.close();
  }

}
