import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from "../../../core/service/user.service";
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [],
  templateUrl: './createUser.component.html',
  styleUrl: './createUser.component.css'
})
export class CreateUserComponent {

  createUserForm: FormGroup = new FormGroup({
    name: new FormControl(
      '',
      [Validators.required]
    ),
    description: new FormControl(
      '',
      [
        Validators.required,
        Validators.minLength(10)
      ]
    ),
    category: new FormControl(
      '',
      [
        Validators.required,
      ]
    ),
    active_ingredient: new FormControl(
      '',
      [
        Validators.required,
      ]
    ),
    concentration: new FormControl(
      '',
      [
        Validators.required,
      ]
    ),
    farmaceutical_form: new FormControl(
      '',
      [
        Validators.required,
      ]
    ),
    quantity_per_unit: new FormControl(
      '',
      [
        Validators.required,
      ]
    ),
    manufacturing_date: new FormControl(
      '',
      [
        Validators.required,
      ]
    ),
    expiration_date: new FormControl(
      '',
      [
        Validators.required,
      ]
    ),
    lot_number: new FormControl(
      '',
      [
        Validators.required,
      ]
    ),
    manufacturer: new FormControl(
      '',
      [
        Validators.required,
      ]
    ),
    purchase_price: new FormControl(
      '',
      [
        Validators.required,
      ]
    ),
    sale_price: new FormControl(
      '',
      [
        Validators.required,
      ]
    ),
    current_stock: new FormControl(
      '',
      [
        Validators.required,
      ]
    ),
    minimun_stock: new FormControl(
      '',
      [
        Validators.required,
      ]
    ),
    location: new FormControl(
      '',
      [
        Validators.required,
      ]
    ),
    sanitary_record: new FormControl(
      '',
      [
        Validators.required,
      ]
    ),
    storage_conditions: new FormControl(
      '',
      [
        Validators.required,
      ]
    ),
    free_sale: new FormControl(
      '',
      [
        Validators.required,
      ]
    ),
    warning: new FormControl(
      '',
      [
        Validators.required,
      ]
    ),
    supplier: new FormControl(
      '',
      [
        Validators.required,
      ]
    ),
    supplier_contact: new FormControl(
      '',
      [
        Validators.required,
      ]
    ),
  });

  isLoading: boolean = false;
  errorMessage: string | null = null;

  //Output
  @Output() userAdded = new EventEmitter<string>();

  constructor( private userService: UserService, private fb: FormBuilder, private dialogRef: MatDialogRef<CreateUserComponent>){}

  valuesUsersForm: any;


}
