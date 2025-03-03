import { ChangeDetectionStrategy, Component, input, Input } from '@angular/core';
import { FontAwesomeModule , IconDefinition} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-fontawesome-icon',
  imports: [
    FontAwesomeModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './fontawesome-icon.component.html',
  styleUrl: './fontawesome-icon.component.scss'
})
export class FontawesomeIconComponent {
  iconDefition = input.required<IconDefinition>();
  @Input() styles:{[key: string] : number | string} = {};
}
