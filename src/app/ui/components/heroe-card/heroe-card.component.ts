import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, Input, output, signal } from '@angular/core';
import { Hero } from '@models/heroes.model';
import { GenericButtonComponent } from '@ui-components/generic-button/generic-button.component';
import { GenericButtonConfigModel } from '@ui-models/generic-button.model';

@Component({
  selector: 'app-heroe-card',
  imports: [
    CommonModule,
    GenericButtonComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './heroe-card.component.html',
  styleUrl: './heroe-card.component.scss'
})
export class HeroeCardComponent {
  @Input({required: true}) hero!: Hero;
  buttonDetailConfig = input.required<GenericButtonConfigModel<Hero> | null>();
  buttonEditConfig = input.required<GenericButtonConfigModel<Hero> | null>();
  buttonDeleteConfig = input.required<GenericButtonConfigModel<Hero> | null>();
  buttonEvent = output<GenericButtonConfigModel<Hero>>();
  heroSelectedEvent = output<Hero>();
  heroSelected: Hero | null = null;
  onHandleButtonClick( button: GenericButtonConfigModel<Hero> ){
    const newState: GenericButtonConfigModel<Hero> = {
      ...button,
      content: this.hero
    }
    this.buttonEvent.emit( newState );
  }

  onSelectHero(){
    this.heroSelected = this.hero;
    console.log('this.heroSelected ',this.heroSelected)
    this.heroSelectedEvent.emit( this.hero );
  }
}
