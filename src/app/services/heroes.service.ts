import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Hero } from '../models/heroes.model';
import { catchError, filter, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private readonly apiUrl = 'http://localhost:5000/heroes';
  private readonly http = inject( HttpClient );

  getHeroes( params: HttpParams = {} as HttpParams ){
    return this.http.get<Hero[]>(this.apiUrl, {params})
    .pipe(
      catchError(( error: HttpErrorResponse ) => {
        let message = "";
        if( error.status === 404 ){
          message = `No fue posible consultar el listado de heroes`;
        }else {
          message = `Error proviente del lado del servidor: ${error?.message}`;
        }
        return throwError(() =>  new Error(message))
      })
    )
  }
  getHeroById( heroId: string ){
    return this.http.get<Hero>(`${this.apiUrl}/${heroId}`)
    .pipe(
      catchError(( error: HttpErrorResponse ) => {
        let message = "";
        if( error.status === 404 ){
          message = `No se encontró algun heroe con id ${heroId}`
        }else {
          message = `Error proviente del lado del servidor: ${error?.message}`;
        }
        return throwError(() =>  new Error(message))
      })
    )
  }
  createHero( hero: Partial<Hero> ){
    return this.http.post<Hero>(this.apiUrl, hero)
    .pipe(
      catchError(( error: HttpErrorResponse ) => {
        let message = "";
        if( error.status === 404 ){
          message = `No se pudo crear al heroe: ${hero.name}`
        }else {
          message = `Error proviente del lado del servidor: ${error?.message}`;
        }
        return throwError(() =>  new Error(message))
      })
    )
  }
  deleteHero( heroId: string ){
    return this.http.delete<any>(`${this.apiUrl}/${heroId}`)
    .pipe(
      catchError(( error: HttpErrorResponse ) => {
        let message = "";
        if( error.status === 404 ){
          message = `No se pudo eliminar al hero seleccionado`
        }else {
          message = `Error proviente del lado del servidor: ${error?.message}`;
        }
        return throwError(() =>  new Error(message))
      })
    )
  }
  updateHero( hero: Partial<Hero> , heroId: string ){
    return this.http.put<Hero>(`${this.apiUrl}/${heroId}`, hero)
    .pipe(
      catchError(( error: HttpErrorResponse ) => {
        let message = "";
        if( error.status === 404 ){
          message = `No se pudo actualizar al heroe: ${hero.name}`
        }else {
          message = `Error proviente del lado del servidor: ${error?.message}`;
        }
        return throwError(() =>  new Error(message))
      })
    )
  }

}
