import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  //Parámetros del botón
  @Input() buttonName: string = 'Nombre del Botón';
  @Input() iconName: string = 'home';

  //Eventos del botón
  @Output() eventClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>;


  onclick(event: MouseEvent){
    this.eventClick.emit(event);
  }
}
