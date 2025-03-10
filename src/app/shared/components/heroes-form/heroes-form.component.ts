import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionsManagerService } from '@core-services/subscription-manager.service';
import { Hero } from '@models/heroes.model';
import { HeroesService } from '@services/heroes.service';
import { SnackBarService } from '@shared-services/snackbar.service';
import { SpinnerService } from '@shared-services/spinner.service';
import { GenericButtonComponent } from '@ui-components/generic-button/generic-button.component';
import { GenericButtonConfigModel } from '@ui-models/generic-button.model';
import { takeUntil } from 'rxjs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { UppercaseDirective } from '../../directives/upper-case.directive';
import { FadeInAnimation } from '../../animations/fadeIn-ui.animations';
import { FiltersService } from '@shared-services/filters.service';

@Component({
  selector: 'app-heroes-form',
  animations: [FadeInAnimation],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GenericButtonComponent,
    MatFormFieldModule,
    MatInputModule,
    UppercaseDirective
  ],
  templateUrl: './heroes-form.component.html',
  styleUrl: './heroes-form.component.scss'
})
export class HeroesFormComponent {
  private readonly activatedRoute = inject( ActivatedRoute );
  private readonly heroesService = inject( HeroesService );
  private readonly filtersService = inject( FiltersService );
  private readonly router = inject( Router );
  private readonly subscriptionsManagerService = inject( SubscriptionsManagerService );
  private readonly snackBarService = inject( SnackBarService );
  public readonly spinnerService = inject( SpinnerService );
  backButtonConfig = signal<GenericButtonConfigModel<Hero>>({
      butttonId: 'back_button',
      content: null,
      fontAwesomeIcon: null,
      label: 'Volver al listado',
      title: 'Navegar',
      labelPosition: 'after',
      buttonBackground: '#2E80E9',
      borderRadius: '5px',
      buttonPadding: '5px 15px',
      width: '100%'
    }
  )
  submitButtonConfig = signal<GenericButtonConfigModel<Hero>>({
      butttonId: 'submit_button',
      content: null,
      fontAwesomeIcon: null,
      label: 'Editar',
      title: 'Editar',
      labelPosition: 'after',
      buttonBackground: '#2e80e9',
      borderRadius: '5px',
      buttonPadding: '5px 15px',
      width: '100%'
    }
  )
  hero: Hero | null = null;
  heroId: string = "";
  heroForm = new FormGroup({
    name: new FormControl('',[Validators.required , Validators.minLength(3)]),
    biography: new FormControl('',[Validators.required , Validators.minLength(10)]),
    universe: new FormControl('',[Validators.required])
  });

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    
      if( Object.keys( params ).length > 0 ){
        const { id } = params;
        this.heroId = id;
        this.heroesService.getHeroById( this.heroId )
        .pipe(
          takeUntil(this.subscriptionsManagerService.subscriptions$)
        )
        .subscribe({
          next: ( response ) => {
            if( !response ){
              this.snackBarService.show('error','No se encontró algun heroe seleccionado', 'Atención');
              return;
            }

            this.heroForm.patchValue(response);
            this.hero = response;
          },
          error: ( error: HttpErrorResponse ) => {
            this.snackBarService.show('error',error.message || "No fue posible realizar la búsqueda, intente nuevamente.", 'Atención');
          }
        })
      }else {
        this.submitButtonConfig.update(( button ) => ({
          ...button,
          label: 'Crear',
          title: 'Crear Heroe'
        }));
      }
  }
  onHandleButtonClick(button: GenericButtonConfigModel<Hero>){
    if( button.butttonId === 'back_button' ){
      this.router.navigate(['heroes']);
    }else if( button.butttonId === 'submit_button' ){

      if( this.heroForm.valid ){
        const formState = this.heroForm.getRawValue() as Omit<Hero , 'id'>;
        const request: Hero = {
          ...formState,
          id: this.heroId
        }

        if( this.hero?.id ){
          this.heroesService.updateHero( request)
          .pipe(
            takeUntil(this.subscriptionsManagerService.subscriptions$)
          )
          .subscribe({
            next: ( response ) => {
              let currentState = this.filtersService.getFiltersState();
              let currentTotal = this.heroesService.getTotalHeroes();
              currentState = {
                ...currentState,
                pageNumber: Math.ceil(currentTotal.length / currentState.pageSize)
              }
              this.filtersService.setFiltersState(currentState);
              this.router.navigate(['heroes']);
            },
            error: ( error: HttpErrorResponse ) => {
              this.snackBarService.show('error',error.message || "No fue posible ejecutar la acción requerida.", 'Atención');
            }
          })
        }else {
          this.heroesService.createHero( request )
          .pipe(
            takeUntil(this.subscriptionsManagerService.subscriptions$)
          )
          .subscribe({
            next: ( response ) => {
              let currentState = this.filtersService.getFiltersState();
              let currentTotal = this.heroesService.getTotalHeroes();
              currentState = {
                ...currentState,
                pageNumber: Math.ceil(currentTotal.length / currentState.pageSize)
              }
              this.filtersService.setFiltersState(currentState);
              this.router.navigate(['heroes']);
            },
            error: ( error: HttpErrorResponse ) => {
              this.snackBarService.show('error',error.message || "No fue posible ejecutar la acción requerida.", 'Atención');
            }
          })
        }
      }
    }
      
  }

}
