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

  //Creamos el método constructor, invocamos al servicio para conectar con node, Router para redirigir
  constructor(private authServie: AuthService, private router: Router){

  }

  //Metodo que invoca el login del authService
  //Se accede desde el boton del formulario
  login(): void{
    this.authServie.login(this.username, this.password).subscribe({
      next: ()=>this.router.navigate(['/dashboard']),
      error: (err)=>console.error('Login falló', err)
    })
  }
}
