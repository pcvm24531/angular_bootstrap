import { Component, Input } from '@angular/core';
import { AuthService } from '../../../core/service/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { TitleComponent } from "../../../shared/components/title/title.component";
import { SpinnerComponent } from "../../../shared/components/spinner/spinner.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ButtonComponent, TitleComponent, SpinnerComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {
  username: string = '';
  password: string = '';
  tittleName: string = '';
  buttonName: string = '';
  typeButton: string = 'submit';
  isLoadinge: boolean = false;


  isLoading: boolean = false;
  errorMessage: string = "";



  //Creamos el método constructor, invocamos al servicio para conectar con node, Router para redirigir
  constructor(private authServie: AuthService, private router: Router){}

  loginForm: FormGroup = new FormGroup(
    {
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    }
  );


  //Metodo que invoca el login del authService
  //Se accede desde el boton del formulario
  login(): void{
    this.isLoading = true;
    //Verificamos si los datos del formulario se completaron
    if( this.loginForm.value ){
      //Hacemos la verificación del login
      this.authServie.login(this.loginForm.value.username, this.loginForm.value.password).subscribe(
        {
          next: ()=>{
            this.isLoading = false;
            this.router.navigate(['/dashboard']);
            this.isLoading = false;
          },
          error: (err) => {
            this.isLoading = false;
            this.errorMessage='El Usuario o Contraseña son inválidos!';
            this.isLoading = false;
          }
        }
      )
    }else{
      this.isLoading = false;
      this.errorMessage='Debe ingresar su Usuario y Contraseña!';
    }
  }
}
