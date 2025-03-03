import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from '../../core/service/user.service';
import { AuthService } from '../../core/service/auth.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export default class ProfileComponent implements OnInit{
  user: any;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private dialog: MatDialog
  ){}

  ngOnInit(): void {
      this.loadUserData();
  }

  //Obtenemos los datos del usuario
  loadUserData(): void{
    this.isLoading=true;
    this.userService.getUserById(this.authService.getUserId()).subscribe(
      { next: (response)=>{
        this.user = response;
      },
      error: (err)=>{
        console.log(`Error al cargar los datos del usuario, ${err}`);
      }
    });
  }

}
