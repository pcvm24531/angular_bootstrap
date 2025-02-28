import { Component, Output, EventEmitter, Inject } from '@angular/core';
import { UserService } from '../../../core/service/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TitleComponent } from "../../../shared/components/title/title.component";
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { SpinnerComponent } from "../../../shared/components/spinner/spinner.component";

@Component({
  selector: 'app-delete',
  standalone: true,
  imports: [TitleComponent, ButtonComponent, SpinnerComponent],
  templateUrl: './deleteUser.component.html',
  styleUrl: './deleteUser.component.css'
})
export class DeleteUserComponent {
  userData: any = null;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  @Output() userDeleted = new EventEmitter<string>();

  constructor(
    private userService: UserService,
    private dialogRef: MatDialogRef<DeleteUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Datos del usuario inyectados
  ) { }


  deletedUser(): void{
    this.isLoading = true;
    this.errorMessage = null;

    //Verificamos si hay datos del usuario
    if( this.data && !this.data._id ){
      this.errorMessage = "No se puede eliminar el usuario";
      this.isLoading = false;
      return;
    }

    this.userService.deleteUser(this.data._id).subscribe({
      next: (response)=>{
        this.close();
        this.isLoading = false;
        this.userDeleted.emit('userDeleted');
        this.errorMessage = "Registro eliminado correctamente!";
      },
      error: (err)=>{
        console.log(`Error al eliminar el usuario, ${err}`);
        this.errorMessage = "No se pudo eliminar el usuario";
        this.isLoading = false;
      }
    });
  }

  close(): void{
    this.dialogRef.close();
  }


}
