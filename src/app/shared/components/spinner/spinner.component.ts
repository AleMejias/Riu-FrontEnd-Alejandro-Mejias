import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { SpinnerService } from '@shared-services/spinner.service';

@Component({
  selector: 'app-spinner',
  imports: [
    CommonModule
  ],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {
  @Input() styles: {[key:string] : string} = {};
  public readonly spinnerService = inject( SpinnerService );
}
