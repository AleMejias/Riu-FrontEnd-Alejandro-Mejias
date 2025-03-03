import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontawesomeIconComponent } from '@ui-components/fontawesome-icon/fontawesome-icon.component';
import { InputTextConfigModel } from '@ui-models/generic-text.model';

@Component({
  selector: 'app-generic-input-text',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontawesomeIconComponent
  ],
  templateUrl: './generic-input-text.component.html',
  styleUrl: './generic-input-text.component.scss'
})
export class GenericInputTextComponent {

  inputConfig = input.required<InputTextConfigModel>();
}
