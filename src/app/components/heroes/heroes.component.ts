import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { HeroesService } from '@services/heroes.service';
import { HeroeCardComponent } from '@ui-components/heroe-card/heroe-card.component';
import { SubscriptionsManagerService } from '@core-services/subscription-manager.service';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
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
import { InputTextConfigModel } from '@ui-models/generic-text.model';
import { FormControl } from '@angular/forms';
import { GenericInputTextComponent } from '@ui-components/generic-input-text/generic-input-text.component';
import { QueryFiltersParams } from '@shared-models/filters.model';
import { FILTERS_HELPER } from '@shared-helpers/filters.helper';

const DEFAULT_PAGE_SIZE = 3;
const DEFAULT_PAGE_NUMBER = 1;

@Component({
  selector: 'app-heroes',
  imports: [
    CommonModule,
    HeroeCardComponent,
    GenericButtonComponent,
    GenericPaginatorComponent, 
    GenericInputTextComponent
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
    pageInfoSeparator: '',
    pageNumber: DEFAULT_PAGE_NUMBER,
    pageSize: DEFAULT_PAGE_SIZE,
    totalRecords: 0,
    totalPages: 0,
    pageSizeOptions: [3 , 5 , 7 , 10],
    lastPage: false
  })
  searchInputFormControl = new FormControl('');
  searchInputConfig =  signal<InputTextConfigModel>({
    inputId: 'searchInputFormControl',
    fontAwesomeIcon: FontAwesomeProviders.faSearch,
    control: this.searchInputFormControl,
    iconStyles: {padding: '0px 10px' , verticalAlign: 'sub'},
    label: '',
    placeHolder: 'Ingrese el nombre del heroe'
  });

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

  queryFiltersParams: QueryFiltersParams = {
    _page : this.paginatorConfig().pageNumber,
    _limit: this.paginatorConfig().pageSize,
    name_like: this.searchInputFormControl.value
  };

  heroes = signal<Hero[]>([]);
  heroSelected = signal<Hero | null>(null);
  search: string = "";

  ngOnInit(): void {

    this.searchInputFormControl.valueChanges
    .pipe(
      takeUntil(this.subscriptionsManagerService.subscriptions$),
      debounceTime(500),
      distinctUntilChanged()
    )
    .subscribe({
      next: ( value ) => {
        this.paginatorConfig.update(( state ) => ({
          ...state,
          pageNumber: DEFAULT_PAGE_NUMBER
        }));
        this.queryFiltersParams = {
          _page : DEFAULT_PAGE_NUMBER,
          name_like: value
        }
        this.getHeroes();
      }
    });


    this.getHeroes()
  }
  getHeroes(){
    const request =FILTERS_HELPER.buildHttpParams( this.queryFiltersParams );
    this.heroesService.getHeroes(request)
    .pipe(takeUntil(this.subscriptionsManagerService.subscriptions$))
    .subscribe({
      next: ( response ) => {
    
        this.paginatorConfig.update(( state ) => ({
          ...state,
          totalRecords: response.length,
          lastPage: response.length < state.pageSize
        }));
        this.heroes.set( response );
      },
      error: ( error ) => {
        this.snackBarService.show('error',error.message || "No fue posible ejecutar la acción requerida.", 'Atención');
      }
    })
  }
  onPage( page: PaginatorEmitEvent ){
    const { pageNumber , pageSize } = page;
    this.queryFiltersParams = {
      ...this.queryFiltersParams,
      _page: pageNumber,
      _limit: pageSize
    }
    this.paginatorConfig.update(( state ) => ({
      ...state,
      pageNumber: ( pageSize !== state.pageSize ) ? 1 : pageNumber, 
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
            this.queryFiltersParams = {
              ...this.queryFiltersParams,
              _page: DEFAULT_PAGE_NUMBER
            }
            this.paginatorConfig.update(( state ) => ({
              ...state,
              pageNumber: DEFAULT_PAGE_NUMBER
            }));
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
