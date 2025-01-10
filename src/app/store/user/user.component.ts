import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../core/service/user.service';
import { ButtonComponent } from "../../shared/components/button/button.component";
import { TitleComponent } from '../../shared/components/title/title.component';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from './create/createUser.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, ButtonComponent, TitleComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export default class UserComponent implements OnInit{
  users: any[] = [];//alamcenamos la lista de usuarios
  loading: boolean = true;//Controlamos la carga de datos
  errorMessage: String | null = null;//Alamcenamos mensajes de error

  constructor(private userService: UserService, private dialog: MatDialog){}

  //Sobre escribimos el métos ngOnInit()
  ngOnInit(): void {
    this.fetchUsers();
  }

  //Función que obtiene los usuarios
  fetchUsers(): void{
    this.loading = true;
    this.userService.getAllUsers().subscribe( {
      next: (response)=>{
        this.users = response;
        this.loading = false;
      },
      error: (error)=>{
        this.errorMessage = 'No se pudo cargar los usuarios(.ts)';
        this.loading = false;
      }
    } );
  }

  //Función que hace llamada al modal
  addUser(event: MouseEvent): void{
    const dialogAdd = this.dialog.open(CreateUserComponent, {
      width: '768px',
      disableClose: true
    });
    dialogAdd.componentInstance.userAdded.subscribe( (event: string)=>{
      if( event ==='userAdded'){
        this.fetchUsers();
      }
    } );
  }

}
