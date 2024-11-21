import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { UserService } from '../../core/service/user.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export default class UserComponent implements OnInit{
  users: any[] = [];
  loading: boolean = true;
  errorMessage: String | null = null;

  constructor(private userService: UserService){}



  //Sobre escribimos el métos ngOnInit()
  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void{
    this.loading = true;
    this.userService.getAllUsers().subscribe( {
      next: (response)=>{
        this.users = response;
        this.loading = false;
      },
      error: (error)=>{
        console.log('Error Al cargar usuarios(.ts)', error);
        this.errorMessage = 'No se pudo cargar los usuarios(.ts)';
        this.loading = false;
      }
    } );
  }
}
