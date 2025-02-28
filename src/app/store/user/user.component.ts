import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/service/user.service';
import { ButtonComponent } from "../../shared/components/button/button.component";
import { TitleComponent } from '../../shared/components/title/title.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from './create/createUser.component';
import { SpinnerComponent } from "../../shared/components/spinner/spinner.component";
import { DeleteUserComponent } from './delete/deleteUser.component';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, ButtonComponent, TitleComponent, SpinnerComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export default class UserComponent implements OnInit{
  users: any[] = [];//alamcenamos la lista de usuarios
  isLoading: boolean = false;//Controlamos la carga de datos
  errorMessage: String | null = null;//Alamcenamos mensajes de error
  disabled: boolean = false;

  constructor(private userService: UserService, private dialog: MatDialog){}

  //Sobre escribimos el métos ngOnInit()
  ngOnInit(): void {
    this.fetchUsers();
  }

  //Función que obtiene los usuarios
  fetchUsers(): void{
    this.isLoading = true;
    this.userService.getAllUsers().subscribe( {
      next: (response)=>{
        this.users = response;
        this.isLoading = false;
      },
      error: (error)=>{
        this.errorMessage = 'No se pudo cargar los usuarios(.ts)';
        this.isLoading = false;
      }
    } );
  }

  //Agregamos un nuevo usuario
  addUser(event: MouseEvent): void{
    const dialogAdd = this.dialog.open(
      CreateUserComponent,
      {
        width: '780px', // Ancho personalizado
        disableClose: true, // Evita que el modal se cierre al hacer clic fuera
        autoFocus: false, // Evita el enfoque automático
      }
     );
     dialogAdd.componentInstance.userAdded.subscribe( (event: string)=>{
      if( event==='userAdded' ){
        this.fetchUsers();
      }
     } );
  }


  //Eliminamos al usuario
  deleteUser(event: MouseEvent, user: any): void{
    const deleteUser = this.dialog.open(DeleteUserComponent, {width: '780px', disableClose: true, data: user});
    deleteUser.componentInstance.userDeleted.subscribe( (event: string)=>{
      if( event==='userDeleted' ){
        this.fetchUsers();
      }
    });
  }
}
