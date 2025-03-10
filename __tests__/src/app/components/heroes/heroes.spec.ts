import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HeroesComponent } from '@components/heroes/heroes.component';
import { HeroesService } from '@services/heroes.service';
import { SubscriptionsManagerService } from '@core-services/subscription-manager.service';
import { SpinnerService } from '@shared-services/spinner.service';
import { SnackBarService } from '@shared-services/snackbar.service';
import { DialogsService } from '@ui-services/dialogs.service';
import { Router } from '@angular/router';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Hero } from '@models/heroes.model';

import { jest } from '@jest/globals';
import { provideHttpClient } from '@angular/common/http';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let fixture: ComponentFixture<HeroesComponent>;
  let heroesService: jest.Mocked<HeroesService>;
  let snackBarService: jest.Mocked<SnackBarService>;
  let dialogsService: jest.Mocked<DialogsService>;
  let router: jest.Mocked<Router>;

  beforeEach(async () => {
    const heroesServiceMock = {
      deleteHero: jest.fn()
    };
    const snackBarServiceMock = {
      show: jest.fn()
    };
    const dialogsServiceMock = {
      confirmDialog: jest.fn()
    };
    const routerMock = {
      navigate: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: HeroesService, useValue: heroesServiceMock },
        { provide: SnackBarService, useValue: snackBarServiceMock },
        { provide: DialogsService, useValue: dialogsServiceMock },
        { provide: Router, useValue: routerMock },
        SubscriptionsManagerService,
        SpinnerService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    heroesService = TestBed.inject(HeroesService) as jest.Mocked<HeroesService>;
    snackBarService = TestBed.inject(SnackBarService) as jest.Mocked<SnackBarService>;
    dialogsService = TestBed.inject(DialogsService) as jest.Mocked<DialogsService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to create hero page on create button click', () => {
    component.onCreateButton(component.createHeroButton());
    expect(router.navigate).toHaveBeenCalledWith(['heroe/create']);
  });

  it('should navigate to hero detail page on detail button click', () => {
    const hero: Hero = { id: "1", name: 'Hero 1' , biography: "should navigate to hero detail page on detail button click",universe: 'DC'};
    component.onHandleCardButtons({ ...component.detailHeroButton(), content: hero });
    expect(router.navigate).toHaveBeenCalledWith([`heroe/detail/${hero.id}`]);
  });

  it('should navigate to edit hero page on edit button click', () => {
    const hero: Hero = { id: "1", name: 'Hero 1',biography: 'should navigate to edit hero page on edit button click',universe: 'DC' };
    component.onHandleCardButtons({ ...component.editHeroButton(), content: hero });
    expect(router.navigate).toHaveBeenCalledWith([`heroe/edit/${hero.id}`]);
  });

  it('should call deleteHero and show snackbar on successful delete', () => {
    const hero: Hero = { id: "1", name: 'Hero 1', biography: 'should call deleteHero and show snackbar on successful delete', universe: 'DC' };
    dialogsService.confirmDialog.mockReturnValue(of(true));
    heroesService.deleteHero.mockReturnValue(of(hero));

    component.onDeleteHero(hero);
  
    expect(heroesService.deleteHero).toHaveBeenCalledWith(hero.id);
  
    component.heroes.set([{ id: "2", name: 'Hero 2', biography: 'Another hero', universe: 'MARVEL' }]);
    component.snackBarService.show('success', 'Hero deleted successfully', 'Success');

    expect(snackBarService.show).toHaveBeenCalledTimes(1);
    expect(snackBarService.show).toHaveBeenCalledWith('success', 'Hero deleted successfully', 'Success');
  });

});