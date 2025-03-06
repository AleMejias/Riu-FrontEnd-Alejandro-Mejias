import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FontawesomeIconComponent } from '@ui-components/fontawesome-icon/fontawesome-icon.component';
import { GenericButtonConfigModel } from '@ui-models/generic-button.model';
import { FontAwesomeProviders } from '../../../../assets/fontawesome/font-awesome-icons.provider';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
  selector: 'app-generic-button',
  imports: [
    CommonModule,
    FontawesomeIconComponent,
    MatTooltipModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './generic-button.component.html',
  styleUrl: './generic-button.component.scss'
})
export class GenericButtonComponent<T> {
  fontAwesomeProviders = FontAwesomeProviders;

  buttonConfig = input.required<GenericButtonConfigModel<T>>();

  buttonEvent = output<GenericButtonConfigModel<T>>();


  onHandleButtonClick( button: GenericButtonConfigModel<T> ){
    this.buttonEvent.emit( button );
  }
}
