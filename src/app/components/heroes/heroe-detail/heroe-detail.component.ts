import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionsManagerService } from '@core-services/subscription-manager.service';
import { Hero } from '@models/heroes.model';
import { HeroesService } from '@services/heroes.service';
import { SnackBarService } from '@shared-services/snackbar.service';
import { GenericButtonComponent } from '@ui-components/generic-button/generic-button.component';
import { GenericButtonConfigModel } from '@ui-models/generic-button.model';
import { takeUntil } from 'rxjs';
import { SpinnerService } from '@shared-services/spinner.service';
import { FadeInAnimation } from '@shared-animations/fadeIn-ui.animations';

@Component({
  selector: 'app-heroe-detail',
  animations: [FadeInAnimation],
  imports: [
    CommonModule,
    GenericButtonComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './heroe-detail.component.html',
  styleUrl: './heroe-detail.component.scss'
})
export default class HeroeDetailComponent
implements OnInit {
  private readonly activatedRoute = inject( ActivatedRoute );
  private readonly heroesService = inject( HeroesService );
  private readonly router = inject( Router );
  private readonly subscriptionsManagerService = inject( SubscriptionsManagerService );
  private readonly snackBarService = inject( SnackBarService );
  public readonly spinnerService = inject( SpinnerService );
  
  backButtonConfig = signal<GenericButtonConfigModel<Hero>>({
      content: null,
      fontAwesomeIcon: null,
      label: 'Voler al listado',
      title: 'Navegar',
      labelPosition: 'after',
      buttonBackground: '#2E80E9',
      borderRadius: '5px',
      buttonPadding: '5px 15px',
      width: '100%'
    }
  )
  hero: Hero | null = null;

  ngOnInit(): void {
      const params = this.activatedRoute.snapshot.params;

      if( params ){
        const { id } = params;
        this.heroesService.getHeroById( id )
        .pipe(
          takeUntil(this.subscriptionsManagerService.subscriptions$)
        )
        .subscribe({
          next: ( response ) => {
            if( !response ){
              this.snackBarService.show('error','No se encontró algun heroe seleccionado', 'Atención');
              return;
            }
            this.hero = response;
          },
          error: ( error: HttpErrorResponse ) => {
            this.snackBarService.show('error',error.message || "No fue posible realizar la búsqueda, intente nuevamente.", 'Atención');
          }
        })
      }else {
        this.router.navigate(['heroes']);
      }
  }
  onHandleButtonClick(){
    this.router.navigate(['heroes']);
  }

}
