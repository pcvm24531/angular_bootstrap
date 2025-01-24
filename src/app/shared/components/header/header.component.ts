import { Component } from '@angular/core';
import { AuthService } from '../../../core/service/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  user:any = null;

  constructor(private authService: AuthService){}

  ngOnInit(){
    console.log( 'This user is:',this.authService.userData$ );
  }

  //Creamos funcion para cerrar session
  logout(): void{
    this.authService.logout();
  }
}
