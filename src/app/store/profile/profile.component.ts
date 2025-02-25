import { Component, Inject, OnInit } from '@angular/core';
import { UserService } from '../../core/service/user.service';
import { AuthService } from '../../core/service/auth.service';

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
    private authService: AuthService
  ){}

  ngOnInit(): void {
      this.loadUserData();
  }


  loadUserData(): void{
    this.isLoading=true;
    this.userService.getUserById(this.authService.getUserId()).subscribe(
      { next: (response)=>{
        this.user = response;
        console.log(this.user);
      },
      error: (err)=>{
        console.log(`Error al cargar los datos del usuario, ${err}`);
      }
    });
  }
}
