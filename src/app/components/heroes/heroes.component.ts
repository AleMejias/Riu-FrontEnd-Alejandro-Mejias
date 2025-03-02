import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { HeroesService } from '@services/heroes.service';
import { HeroeCardComponent } from '@ui-components/heroe-card/heroe-card.component';
import { SubscriptionsManagerService } from '@core-services/subscription-manager.service';
import { takeUntil } from 'rxjs';
import { Hero } from '@models/heroes.model';
import { GenericButtonConfigModel } from '@ui-models/generic-button.model';
import { Router } from '@angular/router';
import { SpinnerService } from '@shared-services/spinner.service';
import { GenericButtonComponent } from '@ui-components/generic-button/generic-button.component';
import { SnackBarService } from '@shared-services/snackbar.service';
import { DialogsService } from '@ui-services/dialogs.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FontAwesomeProviders } from 'assets/fontawesome/font-awesome-icons.provider';
import { GenericPaginatorConfigModel, PaginatorEmitEvent } from '@shared-models/generic-paginator.model';
import { GenericPaginatorComponent } from '@shared-components/generic-paginator/generic-paginator.component';
import { FILTERS_HELPER } from '@shared-helpers/filters.helper';

@Component({
  selector: 'app-heroes',
  imports: [
    CommonModule,
    HeroeCardComponent,
    GenericButtonComponent,
    GenericPaginatorComponent
  ],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss'
})
export default class HeroesComponent
implements OnInit {


  private readonly heroesService = inject( HeroesService );
  private readonly subscriptionsManagerService = inject( SubscriptionsManagerService );
  public readonly spinnerService = inject( SpinnerService );
  private readonly router = inject( Router );
  private readonly snackBarService = inject( SnackBarService );
  private readonly dialogsService = inject( DialogsService );

  paginatorConfig = signal<GenericPaginatorConfigModel>({
    pageOptionsFirstTitle: 'Elementos por página',
    pageOptionsSecondTitle: '',
    pageInfoTitle: 'Página',
    pageInfoSeparator: '-',
    pageNumber: 1,
    pageSize: 3,
    totalRecords: 0,
    totalPages: 0,
    pageSizeOptions: [3 , 5 , 7 , 10]
  })

  createHeroButton = signal<GenericButtonConfigModel<Hero>>({
      butttonId: 'create_hero_button',
      content: null,
      fontAwesomeIcon: null,
      label: 'Crear Heroe',
      title: 'Crear',
      labelPosition: 'after',
      buttonBackground: '#2E80E9',
      borderRadius: '5px',
      buttonPadding: '5px 15px',
    }
  )
  editHeroButton = signal<GenericButtonConfigModel<Hero>>({
      butttonId: 'edit_hero_button',
      content: null,
      fontAwesomeIcon: FontAwesomeProviders.faEdit,
      label: '',
      title: 'Editar heroe',
      labelPosition: 'after',
      buttonBackground: '#f5f5f5',
      iconColor: '#000',
      iconFontSize: '15px'
    }
  )
  detailHeroButton = signal<GenericButtonConfigModel<Hero>>({
      butttonId: 'detail_hero_button',
      content: null,
      fontAwesomeIcon: FontAwesomeProviders.faEye,
      label: '',
      title: 'Ver heroe',
      labelPosition: 'after',
      buttonBackground: '#f5f5f5',
      iconColor: '#000',
      iconFontSize: '15px'
    }
  )
  deleteHeroButton = signal<GenericButtonConfigModel<Hero>>({
      butttonId: 'delete_hero_button',
      content: null,
      fontAwesomeIcon: FontAwesomeProviders.faTrash,
      label: '',
      title: 'Eliminar heroe',
      labelPosition: 'after',
      buttonBackground: '#f5f5f5',
      iconColor: '#000',
      iconFontSize: '15px'
    }
  )
  heroes = signal<Hero[]>([]);
  heroSelected = signal<Hero | null>(null);

  ngOnInit(): void {

    this.getHeroes()
  }
  getHeroes(){
    const request = FILTERS_HELPER.buildHttpParams({
      _page: this.paginatorConfig().pageNumber,
      _limit: this.paginatorConfig().pageSize
    })
    this.heroesService.getHeroes()
    .pipe(takeUntil(this.subscriptionsManagerService.subscriptions$))
    .subscribe({
      next: ( response ) => {
        console.log(response)
        console.log(this.paginatorConfig())
        const from = (this.paginatorConfig().pageNumber * this.paginatorConfig().pageSize) - this.paginatorConfig().pageSize;
        const to = from + this.paginatorConfig().pageSize;
        const pagination = response.slice(from , to);
        this.paginatorConfig.update(( state ) => ({
          ...state,
          totalRecords: response.length,
          totalPages: Math.ceil(response.length / state.pageSize)
        }));
        console.log(pagination)
        this.heroes.set( pagination );
      },
      error: ( error ) => {
        this.snackBarService.show('error',error.message || "No fue posible ejecutar la acción requerida.", 'Atención');
        console.log('GET HEROES ERROR ',error)
      }
    })
  }
  onPage( page: PaginatorEmitEvent ){
    const { pageNumber , pageSize } = page;
    this.paginatorConfig.update(( state ) => ({
      ...state,
      pageNumber, 
      pageSize
    }));
    this.getHeroes();
  }
  onHandleCardButtons( button:GenericButtonConfigModel<Hero>  ){
    if( button.content === null ){ return; }

    if( button.butttonId === 'detail_hero_button' ){
      this.router.navigate([`heroe/detail/${button.content?.id}`]);
    }else if( button.butttonId === 'edit_hero_button' ){
      this.router.navigate([`heroe/edit/${button.content?.id}`]);
    }else if( button.butttonId === 'delete_hero_button' ){

      this.onDeleteHero(button.content);
    }

  }
  onDeleteHero( hero: Hero ){
    this.dialogsService.confirmDialog(
      {
        title: 'Atención',
        message: `Estas seguro de eliminar a ${hero.name} ?`
      },
      {
        minWidth: '200px', 
        maxWidth: '100%',
        disableClose: true 
      }
    )
    .subscribe({
      next: ( response ) => {
        if( !response ){ return; }
        this.heroesService.deleteHero( hero.id )
        .pipe(
          takeUntil(this.subscriptionsManagerService.subscriptions$)
        )
        .subscribe({
          next: ( response ) => {
            this.getHeroes();
          },
          error: ( error: HttpErrorResponse ) => {
            this.snackBarService.show('error',error.message || "No fue posible ejecutar la acción requerida.", 'Atención');
          }
        })
      }
    });

  }
  onCreateButton(button: GenericButtonConfigModel<Hero>){

    this.router.navigate(['heroe/create']);
      
  }

}
