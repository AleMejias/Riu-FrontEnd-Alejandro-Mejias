import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
// import { HeroesService } from '../../../../src/app/services/heroes.service';

// import { Hero } from '../../../../src/app/models/heroes.model';
import { HttpParams, provideHttpClient } from '@angular/common/http';
import { HeroesService } from '@services/heroes.service';
import { Hero } from '@models/heroes.model';

describe('HeroesService', () => {
  let service: HeroesService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:5000/heroes';
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(HeroesService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });
  it('should create HeroesService' , () => {
    expect(true).toBeTruthy();
  });



  it('should retrieve all heroes', () => {
    const dummyResponse: Hero[] = [
      { id: "1", name: 'Superman', biography:"Prueba getAll heroes", universe: 'DC' },
      { id: "2", name: 'Batman', biography:"Prueba getAll heroes", universe: 'DC' }
    ];
    const dummyParams = new HttpParams().set('someParam','value');

    service.getHeroes(dummyParams).subscribe((heroes) => {
      expect(heroes.length).toBeGreaterThanOrEqual(1);
    });

    const req = httpMock.expectOne(`${apiUrl}?someParam=value`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  it('should retrieve a hero by id', () => {
    const dummyResponse: Hero = { id: "1", name: 'Superman' , biography: "Prueba get hero byid", universe: 'DC'};

    service.getHeroById('1').subscribe((resp: Hero) => {
      expect(resp).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  it('should create a new hero', () => {
    const newHero: Partial<Hero> = { name: 'Wonder Woman' , biography: "it biography wonder woman" , universe: 'DC'};
    const createdHero: Partial<Hero> = { name: 'Wonder Woman' , biography: "it biography wonder woman" , universe: 'DC'}

    service.createHero(newHero).subscribe((hero: Partial<Hero>) => {
      expect(hero).toEqual(createdHero);
    });

    const req = httpMock.expectOne(`${apiUrl}`);
    expect(req.request.method).toBe('POST');
    req.flush(createdHero);
  });

  it('should delete a hero by id', () => {
    service.deleteHero('1').subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should update a hero', () => {
    const updatedHero: Partial<Hero> = { name: 'Superman Updated' };
    const heroId = '1';

    service.updateHero(updatedHero, heroId).subscribe((hero) => {
      expect(hero.name).toBe(updatedHero?.name ?? "");
    });

    const req = httpMock.expectOne(`${apiUrl}/${heroId}`);
    expect(req.request.method).toBe('PUT');
    req.flush({ ...updatedHero, id: heroId });
  });

  it('should handle 404 error on getHeroes', (done) => {
    service.getHeroes().subscribe({
      next: () => done.fail('should have failed with 404 error'),
      error: (error: Error) => {
        expect(error.message).toContain('No fue posible consultar el listado de heroes');
        done();
      }
    });
  
    const req = httpMock.expectOne(apiUrl);
    req.flush('No fue posible consultar el listado de heroes', { status: 404, statusText: 'No fue posible consultar el listado de heroes'});
  });
});

