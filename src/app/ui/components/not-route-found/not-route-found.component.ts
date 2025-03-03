import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { GenericButtonComponent } from '@ui-components/generic-button/generic-button.component';
import { GenericButtonConfigModel } from '@ui-models/generic-button.model';

@Component({
  selector: 'app-not-route-found',
  imports: [
    CommonModule,
    GenericButtonComponent
  ],
  templateUrl: './not-route-found.component.html',
  styleUrl: './not-route-found.component.scss',
})
export default class NotRouteFoundComponent {
  private readonly router = inject( Router );
  backButtonConfig = signal<GenericButtonConfigModel<unknown>>({
    content: null,
    fontAwesomeIcon: null,
    label: 'Ir al inicio',
    title: 'Navegar',
    labelPosition: 'after',
    buttonBackground: '#2E80E9',
    borderRadius: '5px',
    buttonPadding: '5px 15px',
    width: '100%',
  });
  onHandleButtonClick(){
    this.router.navigate(['heroes']);
  }
}
