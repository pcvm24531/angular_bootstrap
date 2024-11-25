import { Component, Input } from '@angular/core';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-title',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './title.component.html',
  styleUrl: './title.component.css'
})
export class TitleComponent {

  @Input() tittleName: string = 'Títutlo';

}
