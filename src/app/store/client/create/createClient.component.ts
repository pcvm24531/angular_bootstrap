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
        Validators.pattern('^[0-9]{10}'),
        Validators.minLength(5),
        Validators.maxLength(10)
      ]
    )
  });
  isSubmitting: boolean = false;
  errorMessage: string | null = null;

  constructor ( private clientService: ClientService, private fb: FormBuilder, private dialogRef: MatDialogRef<CreateClientComponent>){}


  valuesClientsForm: any;


  saveClient(): void {
    this.valuesClientsForm = this.createClientForm.value;
  }

  close(): void{
    this.dialogRef.close();
  }

}
