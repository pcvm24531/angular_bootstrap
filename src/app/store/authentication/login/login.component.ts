import { Component } from '@angular/core';
import { AuthService } from '../../../core/service/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {
  username: string = '';
  password: string = '';

  //Creamos el método constructor
  constructor(private authServie: AuthService, private router: Router){

  }
  login(): void{
    this.authServie.login(this.username, this.password).subscribe({
      next: ()=>this.router.navigate(['/dashboard']),
      error: (err)=>console.error('Login falló', err)
    })
  }
}
