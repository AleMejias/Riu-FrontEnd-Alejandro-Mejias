import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { HeroesService } from '@services/heroes.service';
import { HeroeCardComponent } from '@ui-components/heroe-card/heroe-card.component';
import { SubscriptionsManagerService } from '@core-services/subscription-manager.service';
import { takeUntil } from 'rxjs';
import { Hero } from '@models/heroes.model';
import { GenericButtonConfigModel } from '@ui-models/generic-button.model';

@Component({
  selector: 'app-heroes',
  imports: [
    CommonModule,
    HeroeCardComponent
  ],
  templateUrl: './heroes.component.html',
  styleUrl: './heroes.component.scss'
})
export default class HeroesComponent
implements OnInit {


  private readonly heroesService = inject( HeroesService );
  private readonly subscriptionsManagerService = inject( SubscriptionsManagerService )
  cardHeroDetailButton = signal<GenericButtonConfigModel<Hero>>({
    butttonId: 'search_appointments_btn',
    content: null,
    fontAwesomeIcon: null,
    label: 'Ver detalle',
    title: 'Navegar',
    labelPosition: 'after',
    buttonBackground: '#2E80E9',
    borderRadius: '5px',
    buttonPadding: '5px 15px',
    width: '100%'
  }
)
  heroes = signal<Hero[]>([]);


  ngOnInit(): void {
      this.heroesService.getHeroes()
      .pipe(takeUntil(this.subscriptionsManagerService.subscriptions$))
      .subscribe({
        next: ( response ) => {
          console.log('GET HEROES response ',response)
          this.heroes.set( response );
        },
        error: ( error ) => {
          console.log('GET HEROES ERROR ',error)
        }
      })
  }
  onHandleHeroDetail( hero:GenericButtonConfigModel<Hero>  ){
    console.log('click en ',hero)
  }


}
