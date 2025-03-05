import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Hero } from '../models/heroes.model';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  // private readonly apiUrl = 'http://localhost:5000/heroes';
  private readonly apiUrl = 'assets/data.json';
  private readonly http = inject( HttpClient );

  getHeroes( params: HttpParams = {} as HttpParams ){

    const headers = new HttpHeaders({
      'Custom-Message': 'No fue posible consultar el listado de heroes'
    });

    return this.http.get<{heroes:Hero[]}>(this.apiUrl, {headers , params})
  }
  getHeroById( heroId: string ){
    const headers = new HttpHeaders({
      'Custom-Message': 'No se encontró algun heroe seleccionado'
    });

    return this.http.get<Hero>(`${this.apiUrl}/${heroId}`,{headers})
  }
  createHero( hero: Partial<Hero> ){
    const headers = new HttpHeaders({
      'Custom-Message': `No se pudo crear al heroe: ${hero.name}`
    });

    return this.http.post<Hero>(this.apiUrl, hero, {headers})
  }
  deleteHero( heroId: string ){
    const headers = new HttpHeaders({
      'Custom-Message': 'No se pudo eliminar al hero seleccionado'
    });
    return this.http.delete<any>(`${this.apiUrl}/${heroId}`,{headers})
  }
  updateHero( hero: Partial<Hero> , heroId: string ){
    const headers = new HttpHeaders({
      'Custom-Message': `No se pudo actualizar al heroe: ${hero.name}`
    });
    return this.http.put<Hero>(`${this.apiUrl}/${heroId}`, hero, {headers})
  }

}
