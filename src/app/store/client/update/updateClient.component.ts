import { Component } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { TitleComponent } from '../../../shared/components/title/title.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientService } from "../../../core/service/client.service";
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-client',
  standalone: true,
  imports: [TitleComponent, ButtonComponent],
  templateUrl: './updateClient.component.html',
  styleUrl: './updateClient.component.css'
})
export class UpdateClientComponent {

  constructor(private cLientService: ClientService, private formBuilder: FormBuilder, private dialogEdit: MatDialogRef<UpdateClientComponent>){}

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

  updateClient():void{
    console.log('Client Updated');
  }

  close(): void{
    this.dialogEdit.close();
  }

}
